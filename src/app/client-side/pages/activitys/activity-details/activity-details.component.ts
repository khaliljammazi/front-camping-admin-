import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fancybox } from '@fancyapps/ui';
import { Console } from 'console';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Activity } from 'src/app/models/Activity';
import { CampingCenter } from 'src/app/models/CampingCenter';
import { FeedBack } from 'src/app/models/FeedBack';
import { User } from 'src/app/models/user';
import { ActivitiesService } from 'src/app/services/activities.service';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.scss']
})
export class ActivityDetailsComponent implements OnInit {
  activity: Activity = new Activity();
  records: CampingCenter[] = [];
  desc: string = '';
  feedbacks: FeedBack[] = [];
  newFeedback: FeedBack = new FeedBack();
  authenticatedUser: User | undefined;
  selectedRating: number = 0;

  carouselOptions: OwlOptions = {
    loop: true,
    margin: 0,
    nav: true,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    autoplay: true,
    autoplayTimeout: 6000,
    navText: ['<span class="far fa-arrow-left"></span>', '<span class="far-angle-right"></span>'],

    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      800: {
        items: 1
      },
      1024: {
        items: 1
      }
    },
  };

  carouselOptions1 = {
    loop: true,
    margin: 30,
    nav: true,
    smartSpeed: 500,
    autoplay: true,
    autoplayTimeout: 1000,
    autoplayHoverPause: true,
    navText: ['<span class="far fa-angle-left"></span>', '<span class="far fa-angle-right"></span>'],
    responsive: {
      0: {
        items: 1
      },
      480: {
        items: 1
      },
      600: {
        items: 2
      },
      1800: {
        items: 2
      },
      1024: {
        items: 3
      }
    }
  };


  constructor(
    private actService: ActivitiesService,
    private elRef: ElementRef,
    private router: ActivatedRoute,
    private route: Router,
    private feedbackService: FeedbackService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.actService.getById(params['id']).subscribe(
        {
          next: (data: any) => {
            this.activity = data;
            this.fetchFeedbacks();
          }
        }
      );
    });


    this.router.params.subscribe(params => {
      const activityId = Number(params['id']);
      console.log("activity id", activityId);

      this.actService.getCamps(activityId).subscribe(
        {
          next: (camp: CampingCenter[]) => {
            this.records = camp;
            console.log(this.records);
          },
          error: (err: any) => console.log(err)
        }
      );
    });
    this.fetchFeedbacks();
    this.newFeedback = new FeedBack();

    if (!this.authenticatedUser) {
      this.authService.initializeUser();
    }
    this.authenticatedUser = this.authService.currentUser();
    console.log('Selected User:', this.authenticatedUser);
  
  }

  ngOnDestroy() {
    Fancybox.unbind(this.elRef.nativeElement);
    Fancybox.close();
  }

  fetchFeedbacks() {
    this.feedbackService.getActivityFeedbacks(this.activity.id).subscribe(
      (feedbacks: FeedBack[]) => {
        this.feedbacks = feedbacks.filter((feedback) => feedback.rating >= 4);
  
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
          this.route.navigate(['/auth/signin-signup']);
        }
      });
  
      return;
    }
  
    this.newFeedback.id = 0;
    this.newFeedback.activity = this.activity;
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
  

}