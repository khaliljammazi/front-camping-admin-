import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { WidgetModule } from 'src/app/shared/widget/widget.module';
import { DashboardOneRoutingModule } from './dashboard-one-routing.module';
import { DashboardOneComponent } from './dashboard-one.component';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';


@NgModule({
  declarations: [
    DashboardOneComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgApexchartsModule,
    PageTitleModule,
    WidgetModule,
    DashboardOneRoutingModule
  ]
})
export class DashboardOneModule { }
