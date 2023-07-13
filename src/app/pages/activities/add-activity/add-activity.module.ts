import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTitleModule } from "../../../shared/page-title/page-title.module";
import { Select2Module } from 'ng-select2-component';
import { QuillModule } from 'ngx-quill';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { AddActivityComponent } from './add-activity.component';
import { AddActivityRoutingModule } from './add-activity-routing.module';
import { NgxDropzoneModule } from 'ngx-dropzone';



@NgModule({
    declarations: [
        AddActivityComponent
    ],
    imports: [
        CommonModule,
        AddActivityRoutingModule,
        CommonModule,
        PageTitleModule,
        QuillModule,
        NgxDropzoneModule,
        Select2Module,
        NgbTooltipModule
        
    ]
})
export class AddActivityModule { }
