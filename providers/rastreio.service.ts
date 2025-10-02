// rastreio.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RastreioService {

  constructor(private http: HttpClient) { }

  getPrevisoes(usuario: string) {
    console.log("Enviando solicitação para obter previsões para o usuário:", usuario);
    const apiUrl = `https://app.grupoeko7.com.br/previsoes.php?usuario=${usuario}`;
    return this.http.get<any>(apiUrl);
  }

  getInfoMapa(usuario: string) {
    console.log("Enviando solicitação para obter informações do mapa para o usuário:", usuario);
    const apiUrl = `https://app.grupoeko7.com.br/mapa.php?usuario=${usuario}`;
    return this.http.get<any>(apiUrl);
  }
}