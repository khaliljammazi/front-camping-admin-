import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CampingCenter } from 'src/app/models/CampingCenter';
import { ChartjsOptions } from 'src/app/pages/charts/chartjs/chartjs.model';
import { CampCenterService } from 'src/app/services/camp-center.service';
import { MapConfig } from 'src/app/pages/maps/google-map/google-map.model';
import { FeedBack } from 'src/app/models/FeedBack';
import { FeedbackService } from 'src/app/services/feedback.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { ElementRef, Renderer2 } from '@angular/core';


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
    private userService: UserService,
    private renderer: Renderer2

  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.campingsService.getCampingById(params['id']).subscribe(camping => {
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
              }
            ]
          };
          this.fetchFeedbacks();
        } else {
          this.router.navigate(['/client-side']);
        }
      });
    });

    this.userService.getById(1).subscribe(
      (user: User) => {
        this.authenticatedUser = user;
      },
      (error) => {
        console.error('Error fetching authenticated user:', error);
      }
    );
  }

  fetchFeedbacks() {
    this.feedbackService.getCampingCenterFeedbacks(this.camping.id).subscribe(
      (feedbacks: FeedBack[]) => {
        this.feedbacks = feedbacks;
      },
      (error) => {
        console.error('Error fetching feedbacks:', error);
      }
    );
  }
  setRating(rating: number) {
    this.selectedRating = rating;
    this.newFeedback.rating = rating; // Update the newFeedback rating as well
    console.log('Selected rating:', this.selectedRating);
  }

  fillStars(star: number) {
    // Update the selectedRating to the current hovered star
    this.selectedRating = star;
  }

  resetStars() {
    // Reset the selectedRating to the newFeedback.rating (if any)
    this.selectedRating = this.newFeedback.rating || 0;
  }
  getSanitizedContent(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.desc);
  }

  submitFeedback() {
    if (this.authenticatedUser) {
      this.newFeedback.campingCenter = this.camping;
      this.newFeedback.user = this.authenticatedUser;

      this.feedbackService.addFeedback(this.newFeedback).subscribe(
        (feedback: FeedBack) => {
          this.feedbacks.push(feedback);
          this.newFeedback = new FeedBack();
        },
        (error) => {
          console.error('Error submitting feedback:', error);
        }
      );
    } else {
      alert('Please log in to submit feedback.');
    }
  }

  mapReady(map: any): void {
    map.setOptions({
      zoomControl: 'true',
      zoomControlOptions: {
        position: google.maps.ControlPosition.TOP_LEFT
      }
    });
  }
}
