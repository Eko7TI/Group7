import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MadressenzaPageRoutingModule } from './madressenza-routing.module';
import { MadressenzaPage } from './madressenza.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PinchZoomModule } from '../pinch-zoom/pinch-zoom.module'; // Importe o módulo


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MadressenzaPageRoutingModule,
    PinchZoomModule // Importe o módulo aqui
  ],
  declarations: [MadressenzaPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MadressenzaPageModule {}
