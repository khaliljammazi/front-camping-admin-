import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EcommercesRoutingModule } from './ecommerces-routing.module';
import { EcommercesComponent } from './ecommerces.component';


@NgModule({
  declarations: [
    EcommercesComponent
  ],
  imports: [
    CommonModule,
    EcommercesRoutingModule
  ]
})
export class EcommercesModule { }
