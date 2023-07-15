import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingCartComponent } from './shopping-cart.component';

const routes: Routes = [{ path: '', component: ShoppingCartComponent },
{  path: 'add-commands', loadChildren: () => import('../add-command/add-command.module').then(m => m.AddCommandModule) },
{  path: 'product-cart', loadChildren: () => import('../../products/products.module').then(m => m.ProductsModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingCartRoutingModule { }
