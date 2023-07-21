import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitysComponent } from './activitys.component';

const routes: Routes = [{ path: '', component: ActivitysComponent },
{ path: 'detail/:id', loadChildren: () => import('./activity-details/activity-details.module').then(m => m.ActivityDetailsModule) }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivitysRoutingModule { }
