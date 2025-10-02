import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgendaPageRoutingModule } from './agenda-routing.module';

import { AgendaPage } from './agenda.page';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapaComponent } from '../mapa/mapa.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgendaPageRoutingModule,
    GoogleMapsModule
  ],
  declarations: [AgendaPage, MapaComponent]
})
export class AgendaPageModule {}
