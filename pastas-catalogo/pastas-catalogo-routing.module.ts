import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PastasCatalogoPage } from './pastas-catalogo.page';

const routes: Routes = [
  {
    path: '',
    component: PastasCatalogoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PastasCatalogoPageRoutingModule {}
