import { CampingCenterFeedbackRoutingModule } from './camping-center-feedback-routing.module';
import { CampingCenterFeedbackComponent } from './camping-center-feedback.component';
import { AdvancedTableModule } from 'src/app/shared/advanced-table/advanced-table.module';
import { PortletWithHeaderComponent } from './portlet-with-header/portlet-with-header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { UiModule } from 'src/app/shared/ui/ui.module';


@NgModule({
  declarations: [
    CampingCenterFeedbackComponent,
    PortletWithHeaderComponent
  ],
  imports: [
    CommonModule,
    NgbCollapseModule,
    UiModule,
    PageTitleModule,
    CampingCenterFeedbackRoutingModule
  ]
})
export class CampingCenterFeedbackModule { }
