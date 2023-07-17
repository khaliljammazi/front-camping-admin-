import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { FeedBack } from 'src/app/models/FeedBack';
import { ActivitiesService } from 'src/app/services/activities.service';
import { Activity } from 'src/app/models/Activity';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-activity-feedback',
  templateUrl: './activity-feedback.component.html',
  styleUrls: ['./activity-feedback.component.scss']
})
export class ActivityFeedbackComponent implements OnInit {
  pageTitle: BreadcrumbItem[] = [];
  activities: Activity[] = [];
  feedbacks: { [key: number]: FeedBack[] } = {};
  isCardCollapsed: { [key: number]: boolean } = {};
  isClosed: boolean = false;
  isRefreshing: { [key: number]: boolean } = {};

  constructor(
    private feedbackService: FeedbackService,
    private activitiesService: ActivitiesService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.pageTitle = [{ label: 'activity-feedbacks', path: '/', active: true }];
    this.fetchActivities();
  }

  fetchActivities(): void {
    this.activitiesService.getActivity().subscribe(
      (activities) => {
        this.activities = activities;
        this.fetchFeedbacks();
      },
      (error) => {
        console.log('Error fetching activities:', error);
      }
    );
  }

  fetchFeedbacks(): void {
    const activityIds = this.activities.map((activity) => activity.id);
    activityIds.forEach((activityId) => {
      this.feedbackService.getActivityFeedbacks(activityId).subscribe(
        (feedbacks) => {
          this.feedbacks[activityId] = feedbacks;
        },
        (error) => {
          console.log('Error fetching feedbacks:', error);
        }
      );
    });
  }

  closeCard(): void {
    this.isClosed = true;
  }

  refreshCardContent(activityId: number): void {
    this.isRefreshing[activityId] = true;
    this.fetchActivities();
    this.fetchFeedbacks();
    setTimeout(() => {
      this.isRefreshing[activityId] = false;
    }, 1000);
  }

  toggleCollapse(activityId: number): void {
    this.isCardCollapsed[activityId] = !this.isCardCollapsed[activityId];
  }

  getCardHeaderClass(activityId: number): string {
    return this.isCardCollapsed[activityId] ? 'collapsed' : '';
  }

  getRatingStars(feedbacks: FeedBack[]): SafeHtml {
    if (!feedbacks || feedbacks.length === 0) {
      return '';
    }

    const rating = this.calculateAverageRating(feedbacks);
    const roundedRating = Math.round(rating);
    const fullStars = '<i class="mdi mdi-star"></i>'.repeat(roundedRating);
    const halfStar = rating % 1 !== 0 ? '<i class="mdi mdi-star-half"></i>' : '';
    const emptyStars = '<i class="mdi mdi-star-outline"></i>'.repeat(5 - roundedRating);

    const ratingStarsHtml = fullStars + halfStar + emptyStars;
    return this.sanitizer.bypassSecurityTrustHtml(ratingStarsHtml);
  }

  calculateAverageRating(feedbacks: FeedBack[]): number {
    if (!feedbacks || feedbacks.length === 0) {
      return 0;
    }

    const totalRating = feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0);
    const averageRating = totalRating / feedbacks.length;
    return averageRating;
  }
}
