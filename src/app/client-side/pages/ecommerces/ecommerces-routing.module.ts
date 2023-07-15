import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EcommercesComponent } from './ecommerces.component';

const routes: Routes = [{ path: '', component: EcommercesComponent }, { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) }, { path: 'commands', loadChildren: () => import('./commands/commands.module').then(m => m.CommandsModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EcommercesRoutingModule { }
