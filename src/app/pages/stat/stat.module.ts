import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatRoutingModule } from './stat-routing.module';
import { StatComponent } from './stat.component';
import { WidgetModule } from 'src/app/shared/widget/widget.module';

import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { NgChartsModule } from 'ng2-charts';
import { DashboardThreeRoutingModule } from '../dashboard/dashboard-three/dashboard-three-routing.module';


@NgModule({
  declarations: [
    StatComponent
  ],
  imports: [
    CommonModule,
    NgApexchartsModule,
    NgbTooltipModule,
    PageTitleModule,
    UiModule,
    WidgetModule,
    StatRoutingModule,
    NgChartsModule,
    PageTitleModule,
    WidgetModule,
    DashboardThreeRoutingModule
  ]
})
export class StatModule { }
