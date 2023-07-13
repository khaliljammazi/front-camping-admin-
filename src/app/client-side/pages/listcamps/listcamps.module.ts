import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListcampsRoutingModule } from './listcamps-routing.module';
import { ListcampsComponent } from './listcamps.component';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    ListcampsComponent
  ],
  imports: [
    CommonModule,
    ListcampsRoutingModule,
    FormsModule,
    NgbPaginationModule
  ]
})
export class ListcampsModule { }
