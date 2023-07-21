import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { FormsModule } from '@angular/forms';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    BlogComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    FormsModule,
    NgbRatingModule,

  ]
})
export class BlogModule { }
