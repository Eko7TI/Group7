import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuController } from '@ionic/angular';
import { SharedService } from '../providers/shared.service';
import { AuthService } from '../providers/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-suporte',
  templateUrl: './suporte.page.html',
  styleUrls: ['./suporte.page.scss'],
})
export class SuportePage implements OnInit {
  userInfo: any;

  constructor(
    private menuCtrl: MenuController,
    private router: Router,
    public authService: AuthService, 
    private http: HttpClient, 
    private sharedService: SharedService) { }

  ionViewDidLoad() {
    this.menuCtrl.enable(false, 'menuId'); // 'menuId' é o identificador do seu menu
  }

  ngOnInit() {
    console.log('ngOnInit: Executado ao iniciar a página Inicio');

    // Obtém as informações de login do serviço compartilhado
    const { username, password } = this.sharedService.getLoginInfo();

    // Chama a função para obter informações do usuário
    this.getUserInfo(username, password);
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
        } else {
          console.error('getUserInfo: Falha ao obter informações do usuário:', response.message);
          // Exibir mensagem de erro para o usuário, se necessário
        }
      },
      (error) => {
        console.error('getUserInfo: Erro ao obter informações do usuário:', error);
        // Exibir mensagem de erro para o usuário, se necessário
      }
    );
  }

}
