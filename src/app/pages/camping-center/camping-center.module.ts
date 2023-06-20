import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampingCenterRoutingModule } from './camping-center-routing.module';
import { CampingCenterComponent } from './camping-center.component';
import { AdvancedTableModule } from 'src/app/shared/advanced-table/advanced-table.module';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';


@NgModule({
  declarations: [
    CampingCenterComponent
  ],
  imports: [
    CommonModule,
    CampingCenterRoutingModule,
    AdvancedTableModule,
    PageTitleModule
  ]
})
export class CampingCenterModule { }
