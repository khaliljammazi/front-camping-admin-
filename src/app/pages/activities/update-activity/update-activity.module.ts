import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateRoutingModule } from './update-activity-routing.module';
import { PageTitleModule } from "../../../shared/page-title/page-title.module";
import { Select2Module } from 'ng-select2-component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { QuillModule } from 'ngx-quill';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { UpdateActivityComponent } from './update-activity.component';



@NgModule({
  declarations: [
UpdateActivityComponent  ],
  imports: [
    CommonModule,
    UpdateRoutingModule,
    PageTitleModule,
    QuillModule,
    NgxDropzoneModule,
    Select2Module,
    NgbTooltipModule
  ]
})
export class UpdateModule { }
