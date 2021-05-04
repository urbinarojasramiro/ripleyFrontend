
export interface LoginResponse {
    ok      : boolean,
    message : string,
    uid     : string,
    rut     : string,
    nombre  : string,
    token   : string
}

export interface User {
    uid     : string,
    rut     : string,
    token   : string
}

export interface AuthResponse {
    ok      : boolean,
    uid     : string,
    rut     : string,
    token   : string
}

export interface transferResponse {
    ok      : boolean,
    message : string
}

export interface Banks {
    banks   : Bank[];
}

export interface Bank {
    name    : string;
    id      :   string;
}

export interface Destinatarios {
    ok              : boolean,
    destinatarios   : Destinatario[]
}

export interface Destinatario {
    nombre          : string,
    rut             : string,
    email           : string,
    telefono        : string,
    bancoDestino    : string,
    tipoCuenta      : string,
    numeroCuenta    : string
}

export interface HistorialTransferencia {
    ok              : boolean,
    data            : Historial[]
}

export interface Historial {
    nombre          : string,
    rut             : string,
    email           : string,
    bancoDestino    : string,
    tipoCuenta      : string,
    monto           : number
}