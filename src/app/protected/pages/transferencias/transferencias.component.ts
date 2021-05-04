import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Destinatario } from '../../../auth/interfaces/interfaces';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-transferencias',
  templateUrl: './transferencias.component.html',
  styles: [
  ]
})
export class TransferenciasComponent implements OnInit {

  get user(){
    return this.authService.user;
  }

  destinatarios: Destinatario[] = [];
  selectedDestinatario: Destinatario = {
      nombre          : '',
      rut             : '',
      email           : '',
      telefono        : '',
      bancoDestino    : '',
      tipoCuenta      : '',
      numeroCuenta    : ''
  };

  miFormulario: FormGroup = this.fb.group({
    destinatario: ['', [Validators.required]],
    monto: ['', [Validators.required, Validators.min(1)]]
  });

  constructor(private fb: FormBuilder,
              private authService: AuthService) { }

  ngOnInit(): void {
    let rutCliente: string = this.user.rut;
    this.authService.busarDestinatario(rutCliente)
      .subscribe( resp => {
        this.destinatarios = resp.destinatarios;
      });
  }

  campoEsValido(campo: string){
    return this.miFormulario.controls[campo].errors 
            && this.miFormulario.controls[campo].touched;
  }

  crearTransferencia(){
    if( this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      return
    }

    let rutCliente: string = this.user.rut;

    const { destinatario, monto } = this.miFormulario.value;

    this.authService.crearTransferencia( rutCliente, 
                                        destinatario.nombre, 
                                        destinatario.rut,
                                        destinatario.bancoDestino,
                                        destinatario.tipoCuenta,
                                        monto )
      .subscribe( resp => {
        if( resp.ok ){
          Swal.fire('Success', resp.message, 'success');
        }else{
          Swal.fire('Error', resp, 'error');
        }
      });
  }

}
