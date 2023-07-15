import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingCartComponent } from './shopping-cart.component';

const routes: Routes = [{ path: '', component: ShoppingCartComponent },
{  path: 'add-commandss', loadChildren: () => import('../add-command/add-command.module').then(m => m.AddCommandModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingCartRoutingModule { }
