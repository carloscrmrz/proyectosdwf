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
import { Router } from '@angular/router';



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
  completeProdList: Product[] = [];

  

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private productService: ProductService,
    private router: Router
  ) {
    this.cart.rfc = this.rfcTest;
   }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getRandomProducts().subscribe(
      res => {this.products = res
      for ( let prod in this.products ) {
        this.productService.getProduct(this.products[prod].gtin).subscribe(
          res => this.completeProdList.push(res),
          err => console.log(err)
        );
      }
      console.log(this.completeProdList)
    },
      err => console.log(err)
    );
  }

  getProduct(gtin: string) {
      this.productService.getProduct(gtin).subscribe(
        res => { this.product = res;
                  console.log(this.product)
        },
        err => console.log(err)
      )
  }

  getProductByID(id_product: number): Product {
      return this.products.filter((product) => product.id_product == id_product)[0];
  }

  isValidQuantity(cart: CartSend): boolean {
    return this.product.stock >= cart.quantity;
  }

  addToCart(id_product: number) {
    this.cart.id_product = id_product;
    this.cart.quantity = 1;
    this.productService.getProduct(this.getProductByID(id_product).gtin).subscribe(
      res => { 
        /* Verifies if the number of selected product is less or
         * equals than the stock of the product.
         */
        if ( !this.isValidQuantity(this.cart) ) {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'No tenemos tanto stock...',
        });
        return; // If is not valid we exit the method.
      }},
      err => console.log()
    );
    
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
  
  // Redireccionar a detalle del producto --------------------------------------------------

  productDetail(gtin: string){
    this.router.navigate(['product-detail/'+gtin]);
  }

}

