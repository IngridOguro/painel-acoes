import { Routes } from '@angular/router';
import { PainelAcoesComponent } from './pages/painel-acoes/painel-acoes.component';

export const routes: Routes = [
  {
    path:"",
    component: PainelAcoesComponent
  },
    {
    path:"painel-acoes",
    component: PainelAcoesComponent
  }
];
