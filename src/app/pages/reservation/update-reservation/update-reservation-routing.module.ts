import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateReservationComponent } from './update-reservation.component';

const routes: Routes = [{ path: '', component: UpdateReservationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateReservationRoutingModule { }
