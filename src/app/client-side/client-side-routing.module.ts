import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientSideComponent } from './client-side.component';
import { ProfileComponent } from '../apps/contacts/profile/profile.component';
import { CamperGuard } from '../core/guards/camper.guard';

const routes: Routes = [{ path: '', component: ClientSideComponent ,children: [
  { path: '', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)},
  { path: 'products', loadChildren: () => import('../client-side/pages/ecommerces/products/products.module').then(m => m.ProductsModule)},
  {path: 'profile', component: ProfileComponent, canActivate:[CamperGuard] }
]},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientSideRoutingModule { }
