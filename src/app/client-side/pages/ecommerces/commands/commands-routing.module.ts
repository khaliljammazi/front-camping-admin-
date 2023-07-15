import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommandsComponent } from './commands.component';

const routes: Routes = [{ path: '', component: CommandsComponent }, { path: 'add-command', loadChildren: () => import('./add-command/add-command.module').then(m => m.AddCommandModule) }, { path: 'shoppingCart', loadChildren: () => import('./shopping-cart/shopping-cart.module').then(m => m.ShoppingCartModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommandsRoutingModule { }
