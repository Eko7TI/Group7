// Importe HttpClient em seu serviço ou componente para fazer solicitações HTTP
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CatalogoService {
  private catalogUrl = 'https://app.grupoeko7.com.br/catalogos.json'; // Caminho para seu arquivo JSON
  private baseUrl = 'https://app.grupoeko7.com.br/catalogo.php';

  constructor(private http: HttpClient) {}


  getCatalogs(): Observable<any[]> {
    return this.http.get<any[]>(this.catalogUrl);
  }


  getCatalogo(nomeCatalogo: string) {
    console.log('Buscando Imagens no Servidor Online!')
    // Chame o PHP e filtre o catálogo por nome
    return this.http.get<any[]>(this.baseUrl).pipe(
      map(catalogos => catalogos.find(cat => cat.nome === nomeCatalogo))
    );
  }
}
