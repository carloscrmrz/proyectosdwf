/* Base components */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

/* API Utilization */
import { Cart } from '../../_model/cart';
import { CartService } from '../../_service/cart.service';
import {Invoice} from '../../../invoice/_model/invoice';
import {InvoiceService} from '../../../invoice/_service/invoice.service';
import { ProductImage } from 'src/app/modules/product/_model/productImage';
import { ProductImageService } from 'src/app/modules/product/_service/product-image.service';

/* Testing RFC */
import { RFCTest } from 'src/app/shared/rfc-test';
import Swal from 'sweetalert2';

/* JQuery */
declare var $: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  name: string = "";
  surname: string = "";
  address: string = "";
  mail: string = "";
  numero_tarjeta: string = "";
  numero_seguridad: string = "";

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

  invoiceList: Invoice[] = [];


  constructor(
    private cartService: CartService,
    private product_image_service: ProductImageService,
    private invoiceService: InvoiceService,
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
  addToCart() { }
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
    if(this.formulario.invalid){
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Faltan campos por llenar',
      })
      return;
    }
    this.purchase();
    this.deleteCart();
    this.closeModalPago();
  }

  purchase(){
    this.invoiceService.purchase(this.rfcTest).subscribe(
      res => {
        console.log(res),
        this.router.navigate(['invoice/']);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Compra exitosa',
          showConfirmButton: false,
          timer: 1500
        })
      },
      err => {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'No se pudo realizar la compra'
        })
      }
    )
  }

  get f() {
    return this.formulario.controls;
  }

  /* Se muestra el modal de pago */
  createPago() {
    this.formulario.reset();
    $('#pago_modal').modal('show');
  }

  /* Cerrar el modal del pago */
  closeModalPago() {
    $('#pago_modal').modal('hide');
    this.submitted = false;
  }

}
