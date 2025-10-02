import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators'; // Importando o operador tap



@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private userInfo: any;
  private loginInfo: { username: string, password: string } = { username: '', password: '' };

  constructor(private http: HttpClient, private router: Router) {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      this.userInfo = JSON.parse(storedUserInfo);
      console.log('UserInfo recuperado:', this.userInfo);
    }

    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    if (storedUsername && storedPassword) {
      this.loginInfo = { username: storedUsername, password: storedPassword };
    }
  }

  setUserInfo(userInfo: any) {
    this.userInfo = userInfo;
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    console.log('UserInfo definido:', this.userInfo);
  }

  getUserInfo() {
    return {
      usuario: this.loginInfo.username,
      ...this.userInfo
    };
  }

  setLoginInfo(username: string, password: string) {
    this.loginInfo = { username, password };
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
  }

  getLoginInfo() {
    return this.loginInfo;
  }
  

  clearUserInfo() {
    this.userInfo = null;
    localStorage.removeItem('userInfo');
  }

  clearLoginInfo() {
    this.loginInfo = { username: '', password: '' };
    localStorage.removeItem('username');
    localStorage.removeItem('password');
  }

  // Novo método para verificar o status do usuário ao carregar a página
  checkUserStatus() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log("Enviando dados para verificação:", { usuario: this.userInfo.usuario });
    return this.http.post('https://app.grupoeko7.com.br/checkUserStatus.php', 
      JSON.stringify({ usuario: this.userInfo.usuario }), 
      { headers: headers }
    );
  }
  checkUserStatusPeriodically() {
    setInterval(() => {
      if (this.userInfo) {
        console.log('Verificação periódica do status do usuário:', this.userInfo.usuario);
        this.checkUserStatus().subscribe((response: any) => {
          console.log('Resultado da verificação periódica:', response);
          if (response.ativo === '0') { // Se o usuário estiver desativado
            console.log('Usuário desativado, limpando informações e redirecionando para login');
            this.clearUserInfo();
            this.clearLoginInfo();
            this.router.navigate(['/login']);
          }
        }, (error) => {
          console.error('Erro ao verificar o status do usuário:', error);
        });
      }
    }, 3000000); // Verifica a cada 30 segundos (ajuste para testes)
  }
}
