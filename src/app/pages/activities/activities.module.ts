import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdvancedTableModule } from 'src/app/shared/advanced-table/advanced-table.module';
import { ActivitiesComponent } from './activities.component';
import { ActivitiesRoutingModule } from './activities-routing.module';

import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { PageTitleComponent } from 'src/app/shared/page-title/page-title.component';
import { AddActivityComponent } from './add-activity/add-activity.component';
import { UpdateActivityComponent } from './update-activity/update-activity.component';


@NgModule({
  declarations: [
    ActivitiesComponent,
        ],
  imports: [
    CommonModule,
    ActivitiesRoutingModule,
    AdvancedTableModule,
    PageTitleModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class ActivitiesModule { }
