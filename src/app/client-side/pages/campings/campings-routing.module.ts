import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampingsComponent } from './campings.component';

const routes: Routes = [{ path: '', component: CampingsComponent },
{ path: 'activity-details/:id', loadChildren: () => import('../activitys/activity-details/activity-details.module').then(m => m.ActivityDetailsModule) },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampingsRoutingModule { }
