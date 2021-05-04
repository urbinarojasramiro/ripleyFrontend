import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DestinatariosComponent } from './pages/destinatarios/destinatarios.component';
import { TransferenciasComponent } from './pages/transferencias/transferencias.component';
import { HistorialComponent } from './pages/historial/historial.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: DashboardComponent },
      { path: 'destinatarios', component: DestinatariosComponent },
      { path: 'transferencias', component: TransferenciasComponent },
      { path: 'historial', component: HistorialComponent },
      { path: '**', redirectTo: ''}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
