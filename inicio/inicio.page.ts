import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../providers/shared.service';
import { AuthService } from '../providers/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  userInfo: any;
  showInfo: boolean = true;
  isRotated: any;

  constructor(
    private router: Router,
    public authService: AuthService,
    private http: HttpClient,
    private sharedService: SharedService,
  ) {}

  ngOnInit() {
    console.log('ngOnInit: Executado ao iniciar a página Inicio');

    // Verifica se já existem informações do usuário armazenadas no serviço
    this.userInfo = this.sharedService.getUserInfo();
    if (!this.userInfo) {
      // Se não, obtém as informações de login e busca os dados do usuário
      const { username, password } = this.sharedService.getLoginInfo();
      this.getUserInfo(username, password);
    }
  }

  getUserInfo(username: string, password: string) {
    console.log('getUserInfo: Iniciando obtenção de informações do usuário');
    const apiUrl = 'https://app.grupoeko7.com.br/userdata.php';
  
    const requestData = {
      username: username,
      password: password,
    };
  
    this.http.post(apiUrl, requestData).subscribe(
      (response: any) => {
        if (response.success) {
          console.log('getUserInfo: Informações do usuário recebidas:', response.usuario);
          this.userInfo = response.usuario;
          // Armazena as informações do usuário no serviço
          this.sharedService.setUserInfo(this.userInfo);
        } else {
          console.error('getUserInfo: Falha ao obter informações do usuário:', response.message);
        }
      },
      (error) => {
        console.error('getUserInfo: Erro ao obter informações do usuário:', error);
      }
    );
  }

  handleRefresh(event: CustomEvent) {
    setTimeout(() => {
      const { username, password } = this.sharedService.getLoginInfo();
      this.getUserInfo(username, password);
      event.detail.complete();
    }, 2000);
  }

  Logout(): void {
    this.authService.logout();
    this.sharedService.clearUserInfo(); // Limpa as informações do usuário ao fazer logout
    this.sharedService.clearLoginInfo(); // Limpa as informações de login ao fazer logout
    this.router.navigate(['/login']);
  }

  toggleInformation() {
    this.showInfo = !this.showInfo;
    this.isRotated = !this.isRotated;
  }
}
