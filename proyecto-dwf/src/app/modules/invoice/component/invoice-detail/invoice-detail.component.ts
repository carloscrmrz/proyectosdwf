import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/modules/product/_model/product';
import { ProductService } from 'src/app/modules/product/_service/product.service';
import { Invoice } from '../../_model/invoice';
import { InvoiceDetail } from '../../_model/invoice-detail';
import { InvoiceService } from '../../_service/invoice.service';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent implements OnInit {

  invoice: InvoiceDetail[] = [];
  product: Product[] = []
  id_invoice: any = null;

  constructor(
    private invoiceService: InvoiceService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id_invoice = this.route.snapshot.paramMap.get('id_invoice');
    this.getInvoice(this.id_invoice)
    console.log(this.invoice)
  }

  getInvoice(id_invoice: number) {
    this.invoiceService.getItems(id_invoice).subscribe(
      res => {this.invoice = res; 
        for ( let invoice in this.invoice ) {
          this.getProductName(this.invoice[invoice].gtin);
        }
      },
      err => console.log(err)
    );
  }

  getProductName(gtin: string) {
    this.productService.getProduct(gtin).subscribe(
      res => this.product.push(res),
      err => console.log(err)        
    );
  }

  getTotal(): number {
    return this.invoice.map(product => product.total).reduce((a,b) => a+b, 0);
  }

  getSubtotal(): number {
    return this.invoice.map(product => product.subtotal).reduce((a,b) => a+b, 0);
  }

  getTaxes(): number {
    return this.invoice.map(product => product.taxes).reduce((a,b) => a+b, 0);
  }
}
