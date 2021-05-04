import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
  ]
})
export class MenuComponent implements OnInit {

 
  items: MenuItem[] = [];


  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.items = [
      {
          label: 'Nuevo Destinatario',
          icon: 'pi pi-user-plus',
          routerLink: '/dashboard/destinatarios'
      },
      {
          label: 'Realizar Transferencia',
          icon: 'pi pi-dollar',
          routerLink: '/dashboard/transferencias'
      },
      {
          label: 'Historial',
          icon: 'pi pi-clock',
          routerLink: '/dashboard/historial'
      }
  ];
  }

  logout(){
    this.router.navigateByUrl('/auth');
    this.authService.logout();
  }

}
