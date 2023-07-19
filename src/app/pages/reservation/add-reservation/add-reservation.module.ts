import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddReservationRoutingModule } from './add-reservation-routing.module';
import { AddReservationComponent } from './add-reservation.component';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { QuillModule } from 'ngx-quill';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { Select2Module } from 'ng-select2-component';
import { NgbDatepickerModule, NgbTimepickerModule, NgbTooltipModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AddReservationComponent
  ],
  imports: [
    CommonModule,
    AddReservationRoutingModule,
    PageTitleModule,
        QuillModule,
        NgxDropzoneModule,
        Select2Module,
        NgbTooltipModule,
        NgbTypeaheadModule,
        NgbDatepickerModule,
        NgbTimepickerModule,
  ]
})
export class AddReservationModule { }
