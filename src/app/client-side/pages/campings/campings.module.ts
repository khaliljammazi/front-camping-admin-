import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampingsRoutingModule } from './campings-routing.module';
import { CampingsComponent } from './campings.component';


@NgModule({
  declarations: [
    CampingsComponent
  ],
  imports: [
    CommonModule,
    CampingsRoutingModule
  ]
})
export class CampingsModule { }
