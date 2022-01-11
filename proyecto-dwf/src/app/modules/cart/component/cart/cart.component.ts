/* Base components */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

/* API Utilization */
import { Cart } from '../../_model/cart';
import { CartService } from '../../_service/cart.service';
import { ProductImage } from 'src/app/modules/product/_model/productImage';
import { ProductImageService } from 'src/app/modules/product/_service/product-image.service';

/* Testing RFC */
import { RFCTest } from 'src/app/shared/rfc-test';

/* JQuery */
declare var $: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  /* Variables para pago */
  formulario = this.formBuilder.group({
    id_cart: [''],
    id_customer: [''],
    name: ['', Validators.required],
    surname: ['', Validators.required],
    address: ['', Validators.required],
    mail: ['', Validators.required],
    numero_tarjeta: ['', Validators.required],
    numero_seguridad: ['', Validators.required]
  });
  submitted = false;

  /* Variables para control del carrito */
  productCart: Cart = new Cart();
  cart: Cart[] = []
  private rfcTest = RFCTest.dwfRFCtest;

  /* Variables para obtener imagenes */
  images: ProductImage[] = [];
  image: ProductImage[] = [];


  constructor(
    private cartService: CartService,
    private product_image_service: ProductImageService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCarrito();
  }

  getCarrito() {
    this.cartService.getCart(this.rfcTest).subscribe(
      res => {
        this.cart = res;
        for (let product in this.cart) {
          this.getProductImages(this.cart[product].id_product);
        }
        console.log(this.cart);
        console.log(this.images);
      },
      err => console.log(err)
    );
  }

  getCart() {
    this.cartService.getCart(this.rfcTest).subscribe(
      res => {
        this.cart = res;
      },
      err => console.log(err)
    );
  }

  /* Not used in this module, but added for completeness */
  addToCart() {
    this.cartService.addToCart(this.productCart);
  }
  /* Not used in this module, but added for completeness */

  removeFromCart(id_cart: number) {
    this.cartService.removeFromCart(id_cart).subscribe(
      res => {
        console.log(res);
        this.getCart();
      },
      err => console.log(err)
    );

  }

  deleteCart() {
    this.cartService.deleteCart(this.rfcTest);
  }

  getProductImages(id_product: number) {
    this.product_image_service.getProductImages(id_product).subscribe(
      res => {
        this.image = res;
        this.images.push(this.image[0]);
      },
      err => console.log(err)
    )
  }

  /* Metodos para pago */

  /* Método para el formulario de datos de pago */
  onSubmitTarjeta() {
    this.submitted = true;
    this.createPago();
  }

  /* Método prueba para que se muestre el modal,
  ya que su funcionamiento entero va en otro
  sprint */
  createPago() {
    $('#pago_modal').modal('show');
  }

  /* Cerrar el modal del pago */
  closeModalPago() {
    $('#pago_modal').modal('hide');
    this.submitted = false;
  }

}
