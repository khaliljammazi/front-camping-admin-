import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'camping-details/:id', loadChildren: () => import('./campings/campings.module').then(m => m.CampingsModule) },
  { path: 'contact', loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule) },
  { path: 'activitys', loadChildren: () => import('./activitys/activitys.module').then(m => m.ActivitysModule) },
  { path: 'listcamps', loadChildren: () => import('./listcamps/listcamps.module').then(m => m.ListcampsModule) },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
