// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = false;
  private apiUrl = 'https://app.grupoeko7.com.br'; // Removi /teste.php para evitar duplicação
  

  constructor(private http: HttpClient) { }

  loginUser(username: string, password: string): Observable<any> {
    const data = { username: username, password: password };
    return this.http.post(`${this.apiUrl}/teste.php`, data)
      .pipe(
        tap((response: any) => {
          if (response.success) {
            this.isLoggedIn = true;
            // Se houver um token, você pode armazená-lo aqui.
          }
        })
      );
  }

  resetPassword(cnpj: string): Observable<any> {
    const apiUrl = `${this.apiUrl}/reset.php`;
    return this.http.post(apiUrl, { cnpj });
  }

  requestPasswordReset(cnpj: string): Observable<any> {
    const apiUrl = `${this.apiUrl}/reset.php`;
    return this.http.post(apiUrl, { cnpj });
  }

  getUserInfo(username: string, password: string): Observable<any> {
    const loginData = { username, password };
    return this.http.post(`${this.apiUrl}/userdata.php`, loginData);
  }

  setUserLoggedIn(value: boolean): void {
    this.isLoggedIn = value;
  }

  logout(): void {
    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}