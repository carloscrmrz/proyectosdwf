import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApisURI } from 'src/app/shared/apis-uri';

/* Testing RFC */
import { RFCTest } from 'src/app/shared/rfc-test';
import { Invoice } from '../../_model/invoice';
import { InvoiceService } from '../../_service/invoice.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  
  private apiURI = ApisURI.dwf20221apiURI;
  
  /* Variables para listar Facturas. */
  invoiceList: Invoice[] = [];
  private rfcTest = RFCTest.dwfRFCtest;

  constructor(
    private invoiceService: InvoiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getInvoices();
  }

  getInvoices() {
    this.invoiceService.getCart(this.rfcTest).subscribe(
      res => {
        this.invoiceList = res;
      },
      err => console.log(err)
    );
  }

  getDetail(id_invoice: number){
    this.router.navigate([`invoice-detail/${id_invoice}`]);
  }

}
