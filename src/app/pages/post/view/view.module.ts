import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewRoutingModule } from './view-routing.module';
import { ViewComponent } from './view.component';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';


@NgModule({
  declarations: [
    ViewComponent
  ],
  imports: [
    CommonModule,
    ViewRoutingModule,
    PageTitleModule,


  ]
})
export class ViewModule { }
