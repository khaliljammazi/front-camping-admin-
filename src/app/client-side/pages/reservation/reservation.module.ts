import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationRoutingModule } from './reservation-routing.module';
import { ReservationComponent } from './reservation.component';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { QuillModule } from 'ngx-quill';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { Select2Module } from 'ng-select2-component';
import { NgbDatepickerModule, NgbTimepickerModule, NgbTooltipModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ReservationComponent
  ],
  imports: [
    CommonModule,
    ReservationRoutingModule,
    PageTitleModule,
    QuillModule,
    NgxDropzoneModule,
    Select2Module,
    NgbTooltipModule,
    NgbTypeaheadModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    ReactiveFormsModule
  ] 
})
export class ReservationModule { }
