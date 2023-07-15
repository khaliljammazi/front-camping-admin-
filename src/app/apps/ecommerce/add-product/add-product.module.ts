import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Select2Module } from 'ng-select2-component';
import { QuillModule } from 'ngx-quill';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { AddProductRoutingModule } from './add-product-routing.module';
import { AddProductComponent } from './add-product.component';
import { HttpClientModule} from '@angular/common/http';



@NgModule({
  declarations: [
    AddProductComponent
  ],
  imports: [
    CommonModule,
    QuillModule,
    NgxDropzoneModule,
    Select2Module,
    PageTitleModule,
    AddProductRoutingModule,
    HttpClientModule
  ]
})
export class AddProductModule { }
