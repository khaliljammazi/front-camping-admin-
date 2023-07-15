import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCommandRoutingModule } from './add-command-routing.module';
import { AddCommandComponent } from './add-command.component';
import { Select2Module } from 'ng-select2-component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AddCommandComponent
  ],
  imports: [
    CommonModule,
    AddCommandRoutingModule,
    Select2Module,
    NgbNavModule,
    PageTitleModule,
    FormsModule
  ]
})
export class AddCommandModule { }
