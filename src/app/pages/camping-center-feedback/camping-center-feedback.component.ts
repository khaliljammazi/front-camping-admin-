import { Component, Input, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { FeedBack } from 'src/app/models/FeedBack';
import { Column } from 'src/app/shared/advanced-table/advanced-table.component';
import { SortEvent } from 'src/app/shared/advanced-table/sortable.directive';

type PortletCard = {
  cardClasses: string;
  cardTitleClasses?: string;
  isCollapsed: boolean;
};

@Component({
  selector: 'app-camping-center-feedback',
  templateUrl: './camping-center-feedback.component.html',
  styleUrls: ['./camping-center-feedback.component.scss']
})
export class CampingCenterFeedbackComponent implements OnInit {
  pageTitle: BreadcrumbItem[] = [];
  feedbacks: FeedBack[] = [];
  portletsWithHeader: PortletCard[] = [];
  @Input() cardHeaderClass: string = '';
  isClosed: boolean = false;
  refreshRequested: boolean = false;
  columns: Column[] = [];
  pageSizeOptions: number[] = [5, 10, 20];

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.pageTitle = [{ label: 'camping-center-feedbacks', path: '/', active: true }];
    this.fetchFeedbacks();
  }

  fetchFeedbacks(): void {
    this.feedbackService.getFeedbacks().subscribe((feedbacks) => {
      this.feedbacks = feedbacks;
      this.initializePortlets();
    });
  }

  initializePortlets(): void {
    this.portletsWithHeader = this.feedbacks.map((feedback) => {
      return {
        cardClasses: 'bg-dark text-light',
        cardTitleClasses: 'text-light',
        isCollapsed: true
      };
    });
  }

  closeCard(): void {
    this.isClosed = true;
  }

  refreshContent(): void {
    this.refreshRequested = true;
    this.fetchFeedbacks();
    setTimeout(() => {
      this.refreshRequested = false;
    }, 1000);
  }

  toggleCollapse(index: number): void {
    this.portletsWithHeader[index].isCollapsed = !this.portletsWithHeader[index].isCollapsed;
  }
}
