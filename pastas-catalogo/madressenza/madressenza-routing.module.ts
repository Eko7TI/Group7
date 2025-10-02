import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MadressenzaPage } from './madressenza.page';

const routes: Routes = [
  {
    path: '',
    component: MadressenzaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MadressenzaPageRoutingModule {}
