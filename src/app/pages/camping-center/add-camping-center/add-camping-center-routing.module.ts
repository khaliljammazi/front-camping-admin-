import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCampingCenterComponent } from './add-camping-center.component';

const routes: Routes = [{ path: '', component: AddCampingCenterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddCampingCenterRoutingModule { }
