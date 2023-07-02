import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientSideComponent } from './client-side.component';

const routes: Routes = [{ path: '', component: ClientSideComponent ,children: [
  { path: '', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)},
  
]},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientSideRoutingModule { }
