import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityDetailsRoutingModule } from './activity-details-routing.module';
import { ActivityDetailsComponent } from './activity-details.component';


@NgModule({
  declarations: [
    ActivityDetailsComponent
  ],
  imports: [
    CommonModule,
    ActivityDetailsRoutingModule
  ]
})
export class ActivityDetailsModule { }
