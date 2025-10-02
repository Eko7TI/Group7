//catalogo.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CatalogoPageRoutingModule } from './catalogo-routing.module';
import { CatalogoPage } from './catalogo.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PinchZoomModule } from '../pinch-zoom/pinch-zoom.module';




@NgModule({
  declarations: [CatalogoPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatalogoPageRoutingModule,
    PinchZoomModule // Importe o módulo aqui
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CatalogoPageModule {}
