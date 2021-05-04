import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [`
  :host ::ng-deep .p-password input {
      width: 200px
  }
`]
})
export class RegisterComponent {

  miFormulario: FormGroup = this.fb.group({
    rut: ['', [Validators.required]],
    email: ['', [Validators.required, Validators. email]],
    nombre: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) { }

  campoEsValido(campo: string){
    return this.miFormulario.controls[campo].errors 
            && this.miFormulario.controls[campo].touched;
  }

  register(){
    if( this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      return
    }

    const { rut, email, nombre, password } = this.miFormulario.value;
    this.authService.registrarUsuario( rut, email, nombre, password )
      .subscribe( ok => {
        if( ok === true){
          this.router.navigateByUrl('/dashboard');
        }else{
          Swal.fire('Error', ok, 'error');
        }
      });
  }

}
