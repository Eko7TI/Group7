import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Eko7colchoesPage } from './eko7colchoes.page';

const routes: Routes = [
  {
    path: '',
    component: Eko7colchoesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Eko7colchoesPageRoutingModule {}
