import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Historial, User } from '../../../auth/interfaces/interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styles: [
  ]
})
export class HistorialComponent implements OnInit {

  get user(){
    return this.authService.user;
  }

  historial: Historial[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    let rutCliente: string = this.user.rut;
    this.authService.busarHistorial(rutCliente)
      .subscribe( resp => {
        if( resp.ok ){
          this.historial = resp.data;
        }else{
          console.log(resp.ok)
          Swal.fire('Error', "El usuario no tiene transferencias", 'error');
        }
        
      });
  }

}
