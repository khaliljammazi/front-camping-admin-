import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateActivityComponent } from './update-activity.component';

const routes: Routes = [{ path: '', component: UpdateActivityComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateRoutingModule { }
