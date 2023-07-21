import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog.component';

const routes: Routes = [{ path: '', component: BlogComponent },
{ path: "blog-Detail/:id", loadChildren: () => import('./blog-detail/blog-detail.module').then(m => m.BlogDetailModule) },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
