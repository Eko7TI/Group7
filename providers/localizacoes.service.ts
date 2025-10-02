// localizacoes.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocalizacoesService {
  usuario!: string;

  constructor(private http:HttpClient) { }

  getInfoMapa(usuario: string) {
  console.log("Enviando solicitação para obter informações do mapa para o usuário:", usuario);
  const apiUrl = `https://app.grupoeko7.com.br/mapa.php?usuario=${usuario}`;
  return this.http.get<any>(apiUrl);
  }
}