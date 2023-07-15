import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCommandComponent } from './add-command.component';

const routes: Routes = [{ path: '', component: AddCommandComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddCommandRoutingModule { }
