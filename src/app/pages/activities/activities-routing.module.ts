import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitiesComponent } from './activities.component';


const routes: Routes = [
  { path: '', component: ActivitiesComponent },
{ path: 'add-activitiy', loadChildren: () => import('./add-activity/add-activity.module').then(m => m.AddActivityModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivitiesRoutingModule { }
