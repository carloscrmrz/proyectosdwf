import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApisURI } from 'src/app/shared/apis-uri';
import { Invoice } from '../_model/invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private apiURI = ApisURI.dwf20221apiURI;

  constructor(
    private http: HttpClient
  ) { }

  getCart(rfc: string) {
    return this.http.get<Invoice[]>(`${this.apiURI}/invoice/${rfc}`);
  }

  purchase(rfc: string) {
    return this.http.post(`${this.apiURI}/invoice/${rfc}`,
                          { message: "test"});
  }

  getItems(id_invoice: number) {
    return this.http.get(`${this.apiURI}/invoice/${id_invoice}`);
  }
}
