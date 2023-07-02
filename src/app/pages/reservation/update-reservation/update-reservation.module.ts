import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateReservationRoutingModule } from './update-reservation-routing.module';
import { UpdateReservationComponent } from './update-reservation.component';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { QuillModule } from 'ngx-quill';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { Select2Module } from 'ng-select2-component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    UpdateReservationComponent
  ],
  imports: [
    CommonModule,
    UpdateReservationRoutingModule,
    PageTitleModule,
    QuillModule,
    NgxDropzoneModule,
    Select2Module,
    NgbTooltipModule
  ]
})
export class UpdateReservationModule { }
