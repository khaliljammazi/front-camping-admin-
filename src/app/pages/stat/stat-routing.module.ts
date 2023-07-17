import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatComponent } from './stat.component';

const routes: Routes = [{ path: '', component: StatComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatRoutingModule { }
