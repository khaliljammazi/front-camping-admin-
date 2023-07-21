import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';

const routes: Routes = [{ path: '', component: ProductsComponent }, { path: 'add-product', loadChildren: () => import('./add-product/add-product.module').then(m => m.AddProductModule) },
{ path: 'add-product/:id', loadChildren: () => import('./add-product/add-product.module').then(m => m.AddProductModule) },
{ path: 'product-details/:id', loadChildren: () => import('./product-details/product-details.module').then(m => m.ProductDetailsModule) },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
