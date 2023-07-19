import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatRoutingModule } from './stat-routing.module';
import { StatComponent } from './stat.component';
import { WidgetModule } from 'src/app/shared/widget/widget.module';

import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { UiModule } from 'src/app/shared/ui/ui.module';


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
    StatRoutingModule
  ]
})
export class StatModule { }
