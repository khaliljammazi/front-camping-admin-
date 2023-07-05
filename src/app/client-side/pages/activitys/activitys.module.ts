import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivitysRoutingModule } from './activitys-routing.module';
import { ActivitysComponent } from './activitys.component';


@NgModule({
  declarations: [
    ActivitysComponent
  ],
  imports: [
    CommonModule,
    ActivitysRoutingModule
  ]
})
export class ActivitysModule { }
