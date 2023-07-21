import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'camping-details/:id', loadChildren: () => import('./campings/campings.module').then(m => m.CampingsModule) },
  { path: 'contact', loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule) },
  { path: 'ecommerces', loadChildren: () => import('./ecommerces/ecommerces.module').then(m => m.EcommercesModule) },
  { path: 'activities', loadChildren: () => import('./activitys/activitys.module').then(m => m.ActivitysModule) },
  { path: 'activitys', loadChildren: () => import('./activitys/activitys.module').then(m => m.ActivitysModule) },
  { path: 'listcamps', loadChildren: () => import('./listcamps/listcamps.module').then(m => m.ListcampsModule) },
  { path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule) },
  { path: 'detail/:id', loadChildren: () => import('./activitys/activity-details/activity-details.module').then(m => m.ActivityDetailsModule) },
  { path: 'reservation/camping-details/:id', loadChildren: () => import('./reservation/reservation.module').then(m => m.ReservationModule) },
  { path: 'reservation/camping-details/reservation/invoice/:id', loadChildren: () => import('./reservation/invoice/invoice.module').then(m => m.InvoiceModule) }

  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
