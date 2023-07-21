import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCommandComponent } from './add-command.component';

const routes: Routes = [{ path: '', component: AddCommandComponent },
{  path: 'shopping-carts', loadChildren: () => import('../shopping-cart/shopping-cart.module').then(m => m.ShoppingCartModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddCommandRoutingModule { }
