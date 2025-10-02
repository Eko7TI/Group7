import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResetsenhaPageRoutingModule } from './resetsenha-routing.module';

import { ResetsenhaPage } from './resetsenha.page';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ResetsenhaPageRoutingModule
  ],
  declarations: [ResetsenhaPage]
})
export class ResetsenhaPageModule {}
