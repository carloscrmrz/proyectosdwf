import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApisURI } from 'src/app/shared/apis-uri';
import { Cart } from '../_model/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiURI = ApisURI.dwf20221apiURI;

  constructor(
    private http: HttpClient
  ) { }

  addToCart(cart: Cart) {
    return this.http.post(`${this.apiURI}/cart`, cart);
  }

  removeFromCart(id_cart: number) {
    return this.http.delete(`${this.apiURI}/cart/${id_cart}`);
  }

  getCart(rfc: string) {
    return this.http.get<Cart>(`${this.apiURI}/cart/${rfc}`);
  }

  deleteCart(rfc: string) {
    return this.http.delete(`${this.apiURI}/cart/clear/${rfc}`);
  }
}
