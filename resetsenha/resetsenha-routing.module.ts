import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResetsenhaPage } from './resetsenha.page';

const routes: Routes = [
  {
    path: '',
    component: ResetsenhaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResetsenhaPageRoutingModule {}
