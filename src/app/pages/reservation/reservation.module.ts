import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdvancedTableModule } from 'src/app/shared/advanced-table/advanced-table.module';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { ReservationComponent } from './reservation.component';
import { ReservationRoutingModule } from './reservation-routing.module';


@NgModule({
  declarations: [
    ReservationComponent,
 ],
  imports: [
    CommonModule,
    ReservationRoutingModule,
    AdvancedTableModule,
    PageTitleModule
  ]
})
export class ReservationModule { }
