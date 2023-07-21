import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

import { BlogDetailRoutingModule } from './blog-detail-routing.module';
import { BlogDetailComponent } from './blog-detail.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BlogDetailComponent
  ],
  imports: [
    CommonModule,
    BlogDetailRoutingModule,
    NgbRatingModule,
    FormsModule
    
  ]
})
export class BlogDetailModule { }