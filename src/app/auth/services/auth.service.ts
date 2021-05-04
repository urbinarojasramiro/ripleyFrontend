import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { LoginResponse, User, AuthResponse, transferResponse, Banks, Destinatario, Destinatarios, HistorialTransferencia } from '../interfaces/interfaces';
import { catchError, map, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _user!: User;

  get user(){
    return { ...this._user };
  }

  constructor( private http: HttpClient) { }

  login( rut: string, password: string){
      const url = `${ this.baseUrl }/transfer/login`;
      const body = { rut, password };

      return this.http.post<LoginResponse>(url, body)
        .pipe(
          tap(resp => {
            if(resp.ok){
              localStorage.setItem('token', resp.token);
              this._user = {
                rut: resp.rut,
                uid: resp.uid,
                token: resp.token
              }
            }
          }),
          map( resp => resp.ok),
          catchError( err => of(err.error.message))
        );
  }

  registrarUsuario( rut: string, email: string, nombre: string, password: string){
    const url = `${ this.baseUrl }/transfer/crearUsuario`;
    const body = { rut, email, nombre, password };

    return this.http.post<LoginResponse>(url, body)
      .pipe(
        tap(resp => {
          if(resp.ok){
            localStorage.setItem('token', resp.token);
            this._user = {
              rut: resp.rut,
              uid: resp.uid,
              token: resp.token
            }
          }
        }),
        map( resp => resp.ok),
        catchError( err => of(err.error.message))
      );
  }

  crearDestinatario( rutCliente: string, nombre: string, rut: string, email: string, telefono: string, bancoDestino: string, tipoCuenta: string, numeroCuenta: number){
    const url = `${ this.baseUrl }/transfer/crearDestinatario`;
    const body = { rutCliente, nombre, rut, email, telefono, bancoDestino, tipoCuenta, numeroCuenta };

    const headers = new HttpHeaders()
        .set('Authorization', localStorage.getItem('token') || '');

      return this.http.post<transferResponse>(url, body, { headers })
              .pipe(
                map( resp => {
                  return resp
                }),
                catchError( err => of(err.error.message))
              );
  }

  busarDestinatario( rutCliente: string): Observable<Destinatarios>{
    const url = `${ this.baseUrl }/transfer/getDestinatario/?rutCliente=${ rutCliente }`;

    const headers = new HttpHeaders()
        .set('Authorization', localStorage.getItem('token') || '');

      return this.http.get<Destinatarios>(url, { headers });
  }

  busarHistorial( rutCliente: string): Observable<HistorialTransferencia>{
    const url = `${ this.baseUrl }/transfer/getTransferencias/?rutCliente=${ rutCliente }`;

    const headers = new HttpHeaders()
        .set('Authorization', localStorage.getItem('token') || '');

      return this.http.get<HistorialTransferencia>(url, { headers });
  }

  buscarBancos(): Observable<Banks>{
    const url = 'https://bast.dev/api/banks.php';
    return this.http.get<Banks>( url );
  }

  crearTransferencia( rutCliente: string, nombre: string, rut: string, bancoDestino: string, tipoCuenta: string, monto: number){
    const url = `${ this.baseUrl }/transfer/crearTransferencia`;
    const body = { rutCliente, nombre, rut, bancoDestino, tipoCuenta, monto };

    const headers = new HttpHeaders()
        .set('Authorization', localStorage.getItem('token') || '');

      return this.http.post<transferResponse>(url, body, { headers })
              .pipe(
                map( resp => {
                  return resp
                }),
                catchError( err => of(err.error.message))
              );
  }

  validarToken(): Observable<boolean>{

    const url = `${ this.baseUrl }/transfer/renew`;
    const headers = new HttpHeaders()
      .set('Authorization', localStorage.getItem('token') || '');

    return this.http.get<AuthResponse>(url, { headers })
            .pipe(
              map( resp => {

                localStorage.setItem('token', resp.token);
                this._user = {
                  rut: resp.rut,
                  uid: resp.uid,
                  token: resp.token
                }
                return resp.ok
              }),
              catchError( err => of(false))
            );
  }

  logout(){
    localStorage.clear();
  }
}

