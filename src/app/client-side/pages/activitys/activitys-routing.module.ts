import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitysComponent } from './activitys.component';

const routes: Routes = [{ path: '', component: ActivitysComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivitysRoutingModule { }
