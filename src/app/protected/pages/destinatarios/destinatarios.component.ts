import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../../auth/services/auth.service';
import { Bank, Banks } from '../../../auth/interfaces/interfaces';

@Component({
  selector: 'app-destinatarios',
  templateUrl: './destinatarios.component.html',
  styles: [
  ]
})
export class DestinatariosComponent implements OnInit {

  get user(){
    return this.authService.user;
  }

  bancos: Bank[] = [];
  bancoSelected: Bank = {
    name:'',
    id: ''
  }

  miFormulario: FormGroup = this.fb.group({
    rut: ['', [Validators.required]],
    email: ['', [Validators.required, Validators. email]],
    nombre: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    bancoDestino: ['', [Validators.required]],
    tipoCuenta: ['', [Validators.required]],
    numeroCuenta: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.buscarBancos()
      .subscribe( resp => {
        this.bancos = resp.banks;
      });
  }

  campoEsValido(campo: string){
    return this.miFormulario.controls[campo].errors 
            && this.miFormulario.controls[campo].touched;
  }

  crearDestinatario(){
    if( this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      return
    }

    let rutCliente: string = this.user.rut;

    const { rut, email, nombre, telefono, bancoDestino, tipoCuenta, numeroCuenta } = this.miFormulario.value;

    this.authService.crearDestinatario( rutCliente, nombre, rut, email, telefono, bancoDestino.name, tipoCuenta, numeroCuenta )
      .subscribe( resp => {
        if( resp.ok ){
          Swal.fire('Success', resp.message, 'success');
        }else{
          Swal.fire('Error', resp, 'error');
        }
      });
  }

}
