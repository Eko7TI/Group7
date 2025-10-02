import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = 'https://app.grupoeko7.com.br/message.php'; // Substitua pela URL correta do seu backend

  constructor(private http: HttpClient) {}

  getMessages(): Observable<any[]> {
    console.log('Chamando serviço para obter mensagens...');
    return this.http.get<any[]>(this.apiUrl).pipe(
      tap(data => console.log('Mensagens obtidas com sucesso:', data)),
      catchError(error => {
        console.error('Ocorreu um erro ao obter mensagens:', error);
        return of([]);
      })
    );
  }
}
