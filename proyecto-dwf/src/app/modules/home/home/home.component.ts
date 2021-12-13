import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

/* Variable para queries */
declare var $: any;

/* Mensajes para mostrar al usuario */
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  /* Formulario para datos de pago con tarjeta */
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

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  /* Método para el formulario de datos de pago */
  onSubmitTarjeta(){
    this.submitted = true;
    this.createPago();
  }

  /* Método prueba para que se muestre el modal,
  ya que su funcionamiento entero va en otro
  sprint */
  createPago(){
    $('#pago_modal').modal('show');
  }

  /* Cerrar el modal del pago */
  closeModalPago(){
    $('#pago_modal').modal('hide');
    this.submitted = false;
  }

}
