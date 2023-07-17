import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityDetailsRoutingModule } from './activity-details-routing.module';
import { ActivityDetailsComponent } from './activity-details.component';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { AdvancedTableModule } from '../advanced-table/advanced-table.module';


@NgModule({
  declarations: [
    ActivityDetailsComponent
  ],
  imports: [
    CommonModule,
    ActivityDetailsRoutingModule,
    AdvancedTableModule,
    PageTitleModule
  ]
})
export class ActivityDetailsModule { }
