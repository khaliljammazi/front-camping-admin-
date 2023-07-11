import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCampingCenterRoutingModule } from './add-camping-center-routing.module';
import { AddCampingCenterComponent } from './add-camping-center.component';
import { PageTitleModule } from "../../../shared/page-title/page-title.module";
import { Select2Module } from 'ng-select2-component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { QuillModule } from 'ngx-quill';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment.prod';



@NgModule({
    declarations: [
        AddCampingCenterComponent,
        
    ],
    imports: [
        CommonModule,
        AddCampingCenterRoutingModule,
        PageTitleModule,
        QuillModule,
        NgxDropzoneModule,
        Select2Module,
        NgbTooltipModule,
        AgmCoreModule.forRoot({
            apiKey: environment.GOOGLE_MAPS_API_KEY
          }),
   
        
    ]
})
export class AddCampingCenterModule { }
