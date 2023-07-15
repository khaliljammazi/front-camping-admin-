import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityFeedbackComponent } from './activity-feedback.component';

const routes: Routes = [{ path: '', component: ActivityFeedbackComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityFeedbackRoutingModule { }
