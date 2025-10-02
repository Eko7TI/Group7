import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RastreioPage } from './rastreio.page';

const routes: Routes = [
  {
    path: '',
    component: RastreioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RastreioPageRoutingModule {}
