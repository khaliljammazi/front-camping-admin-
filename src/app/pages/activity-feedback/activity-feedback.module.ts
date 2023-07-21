import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityFeedbackRoutingModule } from './activity-feedback-routing.module';
import { ActivityFeedbackComponent } from './activity-feedback.component';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';


@NgModule({
  declarations: [
    ActivityFeedbackComponent,
  ],
  imports: [
    CommonModule,
    ActivityFeedbackRoutingModule,
    PageTitleModule
  ]
})
export class ActivityFeedbackModule { }
