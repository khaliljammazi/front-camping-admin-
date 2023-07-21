import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommandsComponent } from './commands.component';

const routes: Routes = [{ path: '', component: CommandsComponent }, { path: 'add-command', loadChildren: () => import('./add-command/add-command.module').then(m => m.AddCommandModule) },
{ path: 'add-command/:id', loadChildren: () => import('./add-command/add-command.module').then(m => m.AddCommandModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommandsRoutingModule { }
