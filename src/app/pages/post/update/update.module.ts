import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateRoutingModule } from './update-routing.module';
import { UpdateComponent } from './update.component';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { QuillModule } from 'ngx-quill';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UpdateComponent
  ],
  imports: [
    CommonModule,
    UpdateRoutingModule,
    PageTitleModule,
    QuillModule,
    NgxDropzoneModule,
    NgbTooltipModule,
    ReactiveFormsModule
  ]
})
export class UpdateModule { }
