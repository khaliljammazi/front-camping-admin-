import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateRoutingModule } from './update-routing.module';
import { UpdateComponent } from './update.component';
import { PageTitleModule } from "../../../shared/page-title/page-title.module";
import { Select2Module } from 'ng-select2-component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { QuillModule } from 'ngx-quill';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment.prod';



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
    Select2Module,
    NgbTooltipModule,
    AgmCoreModule.forRoot({
      apiKey: environment.GOOGLE_MAPS_API_KEY
    }),

  ]
})
export class UpdateModule { }
