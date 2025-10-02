import { Component, OnInit } from '@angular/core';
import { CatalogoService } from './catalogo.service';

@Component({
  selector: 'app-pastas-catalogo',
  templateUrl: './pastas-catalogo.page.html',
  styleUrls: ['./pastas-catalogo.page.scss'],
})
export class PastasCatalogoPage implements OnInit {
  catalogs: any[] = [];

  constructor(private catalogoService: CatalogoService) { }

  ngOnInit() {
    this.loadCatalogs();
  }

  loadCatalogs() {
    this.catalogoService.getCatalogs().subscribe(data => {
      this.catalogs = data;
    });
  }
}