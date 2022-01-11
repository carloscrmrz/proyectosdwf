import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './component/cart/cart.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CartModule { }
