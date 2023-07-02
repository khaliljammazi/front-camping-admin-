import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationComponent } from './reservation.component';

const routes: Routes = [
  { path: '', component: ReservationComponent },
  { path: 'addreservation', loadChildren: () => import('./add-reservation/add-reservation.module').then(m => m.AddReservationModule) },
  { path: 'updatereservation/:id', loadChildren: () => import('./update-reservation/update-reservation.module').then(m => m.UpdateReservationModule) },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationRoutingModule { }
