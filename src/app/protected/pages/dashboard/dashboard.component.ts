import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  get user(){
    return this.authService.user;
  }

  constructor( private authService: AuthService ) { }

  ngOnInit(): void {
  }

}
