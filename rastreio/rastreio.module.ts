import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RastreioPageRoutingModule } from './rastreio-routing.module';

import { RastreioPage } from './rastreio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RastreioPageRoutingModule
  ],
  declarations: [RastreioPage]
})
export class RastreioPageModule {}
