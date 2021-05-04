import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MenuComponent } from './pages/menu/menu.component';
import { TransferenciasComponent } from './pages/transferencias/transferencias.component';
import { DestinatariosComponent } from './pages/destinatarios/destinatarios.component';
import { HistorialComponent } from './pages/historial/historial.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    MenuComponent,
    TransferenciasComponent,
    DestinatariosComponent,
    HistorialComponent
  ],
  exports: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    PrimeNgModule,
    ReactiveFormsModule
  ]
})
export class ProtectedModule { }
