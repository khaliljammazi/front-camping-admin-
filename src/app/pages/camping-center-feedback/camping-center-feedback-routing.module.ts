import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampingCenterFeedbackComponent } from './camping-center-feedback.component';

const routes: Routes = [{ path: '', component: CampingCenterFeedbackComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampingCenterFeedbackRoutingModule { }
