import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './component/category/category.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProductComponent } from './component/product/product.component';
import { NgxPhotoEditorModule } from "ngx-photo-editor";


@NgModule({
  declarations: [
    CategoryComponent,
    ProductComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPhotoEditorModule
  ],
  exports: [
    CategoryComponent,
    ProductComponent,
  ]
})
export class ProductModule { }