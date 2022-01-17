import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProductModule } from '../product/product.module';
import { ProductDetailComponent } from '../product/component/product-detail/product-detail.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
