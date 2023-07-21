import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivitysRoutingModule } from './activitys-routing.module';
import { ActivitysComponent } from './activitys.component';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { AdvancedTableModule } from 'src/app/shared/advanced-table/advanced-table.module';
//import { AdvancedTableModule } from './advanced-table/advanced-table.module';


@NgModule({
  declarations: [
    ActivitysComponent
  ],
  imports: [
    CommonModule,
    ActivitysRoutingModule,
    AdvancedTableModule,
    PageTitleModule
  ]
})
export class ActivitysModule { }
