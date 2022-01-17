import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './component/header/header.component';
import { NavComponent } from './component/nav/nav.component';
import { FooterComponent } from './component/footer/footer.component';
import { CategoryComponent } from '../product/component/category/category.component';
import { ProductComponent } from '../product/component/product/product.component';
import { ProductDetailComponent } from '../product/component/product-detail/product-detail.component';
import { InvoiceComponent } from '../invoice/component/invoice/invoice.component';
import { InvoiceDetailComponent } from '../invoice/component/invoice-detail/invoice-detail.component';

const routes: Routes = [
  {path: 'category', component: CategoryComponent},
  {path: 'product', component: ProductComponent},
  {path: 'product-detail/:gtin', component: ProductDetailComponent},
  {path: 'invoice', component: InvoiceComponent},
  {path: 'invoice-detail/:id_invoice', component: InvoiceDetailComponent}
];

@NgModule({
  declarations: [
    HeaderComponent,
    NavComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    HeaderComponent,
    NavComponent,
    FooterComponent
  ]
})
export class LayoutModule { }
