import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs'; // Importe o Subject do RxJS

@Injectable({
  providedIn: 'root'
})
export class MapaService {
  private mapaAbertoSubject = new Subject<boolean>(); // Adicione esta linha para criar o Subject

  // Este getter permite que outros componentes se inscrevam para receber atualizações
  public mapaAberto$ = this.mapaAbertoSubject.asObservable();

  constructor(private http: HttpClient) { }

  getTruckLocations(): Observable<any[]> {
    return this.http.get<any[]>('https://app.grupoeko7.com.br/rastreamento.php');
  }

  abrirMapa() {
    this.mapaAbertoSubject.next(true); // Isso agora funcionará porque mapaAbertoSubject é um Subject
  }

  fecharMapa() {
    this.mapaAbertoSubject.next(false);
  }
}
