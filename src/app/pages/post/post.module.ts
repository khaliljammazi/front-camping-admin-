import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostComponent } from './post.component';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { AdvancedTableModule } from 'src/app/shared/advanced-table/advanced-table.module';


@NgModule({
  declarations: [
    PostComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    AdvancedTableModule,
    PageTitleModule
  ]
})
export class PostModule { }
