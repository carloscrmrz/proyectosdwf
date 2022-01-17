import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceComponent } from './component/invoice/invoice.component';
import { InvoiceDetailComponent } from './component/invoice-detail/invoice-detail.component';



@NgModule({
  declarations: [
    InvoiceComponent,
    InvoiceDetailComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InvoiceComponent,
    InvoiceDetailComponent
  ]
})
export class InvoiceModule { }
