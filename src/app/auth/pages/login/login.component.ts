import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
        :host ::ng-deep .p-password input {
            width: 200px
        }
    `]
})
export class LoginComponent{

  miFormulario: FormGroup = this.fb.group({
    rut: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) { }

  campoEsValido(campo: string){
    return this.miFormulario.controls[campo].errors 
            && this.miFormulario.controls[campo].touched;
  }

  login(){
    if( this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      return
    }

    const { rut, password } = this.miFormulario.value;
    this.authService.login( rut, password )
      .subscribe( ok => {
        if( ok === true){
          this.router.navigateByUrl('/dashboard');
        }else{
          Swal.fire('Error', ok, 'error');
        }
      });
  }

}
