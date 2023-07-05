import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampingCenterComponent } from './camping-center.component';

const routes: Routes = [{ path: '', component: CampingCenterComponent },
 { path: 'add-camp', loadChildren: () => import('./add-camping-center/add-camping-center.module').then(m => m.AddCampingCenterModule) },
 { path: 'update/:id', loadChildren: () => import('./update/update.module').then(m => m.UpdateModule) },
 { path: 'view/:id', loadChildren: () => import('./view/view.module').then(m => m.ViewModule) },
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampingCenterRoutingModule { }
