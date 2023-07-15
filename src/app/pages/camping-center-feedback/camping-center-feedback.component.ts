import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { FeedBack } from 'src/app/models/FeedBack';
import { CampCenterService } from 'src/app/services/camp-center.service';
import { CampingCenter } from 'src/app/models/CampingCenter';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-camping-center-feedback',
  templateUrl: './camping-center-feedback.component.html',
  styleUrls: ['./camping-center-feedback.component.scss']
})
export class CampingCenterFeedbackComponent implements OnInit {
  pageTitle: BreadcrumbItem[] = [];
  campcenters: CampingCenter[] = [];
  feedbacks: { [key: number]: FeedBack[] } = {};
  isCardCollapsed: { [key: number]: boolean } = {};
  isClosed: boolean = false;
  isRefreshing: { [key: number]: boolean } = {};

  constructor(
    private feedbackService: FeedbackService,
    private campcenterservice: CampCenterService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.pageTitle = [{ label: 'camping-center-feedbacks', path: '/', active: true }];
    this.fetchCampingCenters();
  }

  fetchCampingCenters(): void {
    this.campcenterservice.getCamps().subscribe(
      (campcenters) => {
        this.campcenters = campcenters;
        this.fetchFeedbacks();
      },
      (error) => {
        console.log('Error fetching camping centers:', error);
      }
    );
  }

  fetchFeedbacks(): void {
    const campingCenterIds = this.campcenters.map((campcenter) => campcenter.id);
    campingCenterIds.forEach((campingCenterId) => {
      this.feedbackService.getCampingCenterFeedbacks(campingCenterId).subscribe(
        (feedbacks) => {
          this.feedbacks[campingCenterId] = feedbacks;
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

  refreshCardContent(campcenterId: number): void {
    this.isRefreshing[campcenterId] = true;
    this.fetchCampingCenters();
    this.fetchFeedbacks();
    setTimeout(() => {
      this.isRefreshing[campcenterId] = false;
    }, 1000);
  }

  toggleCollapse(campcenterId: number): void {
    this.isCardCollapsed[campcenterId] = !this.isCardCollapsed[campcenterId];
  }

  getCardHeaderClass(campcenterId: number): string {
    return this.isCardCollapsed[campcenterId] ? 'collapsed' : '';
  }

  getRatingStars(feedbacks: FeedBack[]): SafeHtml {
    if (!feedbacks || feedbacks.length === 0) {
      return '';
    }

    const rating = this.calculateAverageRating(feedbacks);
    const roundedRating = Math.round(rating);
    const fullStars = '<i class="mdi mdi-star"></i>'.repeat(roundedRating);
    const halfStar = (rating % 1 !== 0) ? '<i class="mdi mdi-star-half"></i>' : '';
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
