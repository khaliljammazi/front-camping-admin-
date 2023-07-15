import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';

const routes: Routes = [{ path: '', component: ProductsComponent }, { path: 'productDetails/:id', loadChildren: () => import('./product-details/product-details.module').then(m => m.ProductDetailsModule) },{ path:'shopping-cart', loadChildren: () => import('../commands/shopping-cart/shopping-cart.module').then(m => m.ShoppingCartModule)}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
