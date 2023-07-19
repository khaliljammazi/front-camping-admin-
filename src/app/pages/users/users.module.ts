import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ListUsersComponent } from './list-users/list-users.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { AdvancedTableModule } from 'src/app/shared/advanced-table/advanced-table.module';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { Select2Module } from 'ng-select2-component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { QuillModule } from 'ngx-quill';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    ListUsersComponent,
    UserDetailsComponent,
    AddUserComponent,
    UpdateUserComponent
  ],
  imports: [
    CommonModule,
    AdvancedTableModule,
    PageTitleModule,
    UsersRoutingModule,
    QuillModule,
    NgxDropzoneModule,
    Select2Module,
    NgbTooltipModule,
    AgmCoreModule.forRoot({
        apiKey: environment.GOOGLE_MAPS_API_KEY
      }),
  ]
})
export class UsersModule { }
