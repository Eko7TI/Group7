import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Eko7colchoesPageRoutingModule } from './eko7colchoes-routing.module';
import { Eko7colchoesPage } from './eko7colchoes.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PinchZoomModule } from '../pinch-zoom/pinch-zoom.module';

@NgModule({
  imports: [
    
    CommonModule,
    FormsModule,
    IonicModule,
    Eko7colchoesPageRoutingModule,
    PinchZoomModule // Importe o módulo aqui
  ],
  declarations: [Eko7colchoesPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Eko7colchoesPageModule {}
