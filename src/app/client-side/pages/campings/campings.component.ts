import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CampingCenter } from 'src/app/models/CampingCenter';
import { ChartjsOptions } from 'src/app/pages/charts/chartjs/chartjs.model';
import { CampCenterService } from 'src/app/services/camp-center.service';
import { MapConfig } from 'src/app/pages/maps/google-map/google-map.model';
import { FeedBack } from 'src/app/models/FeedBack';
import { FeedbackService } from 'src/app/services/feedback.service';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-campings',
  templateUrl: './campings.component.html',
  styleUrls: ['./campings.component.scss']
})
export class CampingsComponent implements OnInit {
  camping: CampingCenter = new CampingCenter();
  desc: string = '';
  gmapConfig2!: MapConfig;
  feedbacks: FeedBack[] = [];
  newFeedback: FeedBack = new FeedBack();
  authenticatedUser: User | undefined;
  selectedRating: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private campingsService: CampCenterService,
    private feedbackService: FeedbackService,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.campingsService.getCampingById(params['id']).subscribe((camping) => {
        if (camping) {
          this.camping = camping;
          const vlat = parseFloat(this.camping.location.split(',')[0]);
          const vlng = parseFloat(this.camping.location.split(',')[1]);
          this.desc = this.camping.description;
          this.gmapConfig2 = {
            lat: vlat,
            lng: vlng,
            markers: [
              {
                lat: vlat,
                lng: vlng,
                title: this.camping.label,
              },
            ],
          };
          this.fetchFeedbacks();
        } else {
          this.router.navigate(['/client-side']);
        }
      });
    });



    this.newFeedback = new FeedBack();

    if (!this.authenticatedUser) {
      this.authService.initializeUser();
    }
    this.authenticatedUser = this.authService.currentUser();
    console.log('Selected User:', this.authenticatedUser);

  }

  fetchFeedbacks() {
    this.feedbackService
      .getCampingCenterFeedbacks(this.camping.id)
      .subscribe(
        (feedbacks: FeedBack[]) => {
          this.feedbacks = feedbacks.filter((feedback) => feedback.rating > 3);
        console.log('Fetched feedbacks:', this.feedbacks);

        },
        (error) => {
          console.error('Error fetching feedbacks:', error);
        }
      );
  }

  setRating(rating: number) {
    this.selectedRating = rating;
    this.newFeedback.rating = rating;
    console.log('Selected rating:', this.selectedRating);
  }

  fillStars(star: number) {
    this.selectedRating = star;
  }

  resetStars() {
    this.selectedRating = this.newFeedback.rating || 0;
  }

  getSanitizedContent(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.desc);
  }

  submitFeedback() {
    this.authenticatedUser = this.authService.currentUser();
  
    if (!Object.keys(this.authenticatedUser).length) {
      Swal.fire({
        title: 'Please Log In',
        text: 'Please log in to submit feedback.',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Sign In / Sign Up',
        cancelButtonText: 'No, thanks',
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/auth/signin-signup']);
        }
      });
  
      return;
    }
  
    this.newFeedback.id = 0;
    this.newFeedback.campingCenter = this.camping;
    this.newFeedback.user = {
      id: this.authenticatedUser.id || 0,
      roles: this.authenticatedUser.roles, 
    };
  
    this.feedbackService.addFeedback(this.newFeedback).subscribe(
      (feedback: FeedBack) => {
        this.feedbacks.push(feedback);
        this.newFeedback = new FeedBack();
  
        Swal.fire({
          title: 'Success',
          text: 'Feedback added successfully!',
          icon: 'success',
        });
      },
      (error) => {
        console.error('Error submitting feedback:', error);
  
        Swal.fire({
          title: 'Error',
          text: 'An error occurred while submitting the feedback.',
          icon: 'error',
        });
      }
    );
  }
  
  
  
  mapReady(map: any): void {
    map.setOptions({
      zoomControl: 'true',
      zoomControlOptions: {
        position: google.maps.ControlPosition.TOP_LEFT,
      },
    });
  }
}
