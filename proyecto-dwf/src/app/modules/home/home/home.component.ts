/* Misc */
import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

import { RFCTest } from 'src/app/shared/rfc-test';

import { CartService } from '../../cart/_service/cart.service';
import { Product } from '../../product/_model/product';

/* Variable para queries */
declare var $: any;

/* Mensajes para mostrar al usuario */
import Swal from 'sweetalert2';

import { ProductService } from '../../product/_service/product.service';
import { CartSend } from './_model/cartsend';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  /* Variables para uso de Productos. */
  products: Product[] = [];
  product: Product = new Product();
  cart: CartSend = new CartSend();

  private rfcTest = RFCTest.dwfRFCtest;

  

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private productService: ProductService,
  ) {
    this.cart.rfc = this.rfcTest;
   }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getRandomProducts().subscribe(
      res => this.products = res,
      err => console.log(err)
    );
  }

  getProduct(gtin: string) {
      this.productService.getProduct(gtin).subscribe(
        res => this.product = res,
        err => console.log(err)
      )
  }


  // TODO: A veces deja agregar, a veces no. arreglar bug.
  addToCart(id_product: number) {
    this.cart.id_product = id_product;
    this.cart.quantity = 1;
    this.cartService.addToCart(this.cart).subscribe(
     res => {
        Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Producto añadido al carrito!',
        showConfirmButton: false,
        timer: 1500
      })
    },
    err => {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'No se pudo agregar el producto al carrito',
      })
    }
    )
  }
}
