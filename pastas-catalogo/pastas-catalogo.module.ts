import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PastasCatalogoPageRoutingModule } from './pastas-catalogo-routing.module';

import { PastasCatalogoPage } from './pastas-catalogo.page';
import { FolderComponent } from './folder/folder.component'; // Importe o componente FolderComponent


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PastasCatalogoPageRoutingModule
  ],
  declarations: [PastasCatalogoPage, FolderComponent], // Adicione o FolderComponent às declarações
  exports: [FolderComponent] // Exporte o FolderComponent
})
export class PastasCatalogoPageModule {}
