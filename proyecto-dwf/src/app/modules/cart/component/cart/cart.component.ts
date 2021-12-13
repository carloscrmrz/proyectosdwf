import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/modules/product/_model/product';
import { Cart } from '../../_model/cart';
import { CartService } from '../../_service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products: Product[] = [];
  cart: Cart = new Cart();

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.addToCart();
    this.getCarrito();
  }

  getCarrito() {
    this.cartService.getCart("SAIV920101A00").subscribe(
      res => {
        this.cart = res;
        console.log(this.cart)
      },
      err => console.log(err)
    )
  }

  addToCart() {
    this.cartService.addToCart(this.cart)
  }

  removeFromCart(id_cart: number) {
    this.cartService.removeFromCart(id_cart);
  }

}
