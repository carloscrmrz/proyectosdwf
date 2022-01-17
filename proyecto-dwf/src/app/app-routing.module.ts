import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home/home.component';
import { CategoryComponent } from '../app/modules/product/component/category/category.component';
import { CartComponent } from './modules/cart/component/cart/cart.component';
import { CommonModule  } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvoiceComponent } from './modules/invoice/component/invoice/invoice.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'category', component: CategoryComponent},
  { path: 'cart', component: CartComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule, FormsModule, ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }