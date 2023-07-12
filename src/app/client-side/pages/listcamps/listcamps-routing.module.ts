import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListcampsComponent } from './listcamps.component';

const routes: Routes = [{ path: '', component: ListcampsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListcampsRoutingModule { }
