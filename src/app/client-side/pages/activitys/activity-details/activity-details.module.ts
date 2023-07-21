import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

import { ActivityDetailsRoutingModule } from './activity-details-routing.module';
import { ActivityDetailsComponent } from './activity-details.component';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { AdvancedTableModule } from 'src/app/shared/advanced-table/advanced-table.module';
import { CarouselModule } from 'ngx-owl-carousel-o';


@NgModule({
  declarations: [
    ActivityDetailsComponent
  ],
  imports: [
    CommonModule,
    ActivityDetailsRoutingModule,
    AdvancedTableModule,
    FormsModule,
    PageTitleModule,
    CarouselModule
  ]
})
export class ActivityDetailsModule { }
