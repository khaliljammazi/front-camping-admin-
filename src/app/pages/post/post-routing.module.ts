import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './post.component';

const routes: Routes = [{ path: '', component: PostComponent },
 { path: 'add', loadChildren: () => import('./add/add.module').then(m => m.AddModule) },
  { path: 'edit/:id', loadChildren: () => import('./update/update.module').then(m => m.UpdateModule) },
  { path: 'view/:id', loadChildren: () => import('./view/view.module').then(m => m.ViewModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
