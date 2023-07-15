import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Select2Module } from 'ng-select2-component';
import { QuillModule } from 'ngx-quill';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ReactiveFormsModule } from '@angular/forms';
import { AddProductRoutingModule } from './add-product-routing.module';
import { AddProductComponent } from './add-product.component';
import { HttpClientModule} from '@angular/common/http';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
@NgModule({
  declarations: [
    AddProductComponent
  ],
  imports: [
    CommonModule,
    AddProductRoutingModule,
    NgxDropzoneModule,
    QuillModule ,
    HttpClientModule,
    PageTitleModule,
    ReactiveFormsModule
  ]
})
export class AddProductModule { }
