import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityDetailsComponent } from './activity-details.component';

const routes: Routes = [{ path: '', component: ActivityDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityDetailsRoutingModule { }
