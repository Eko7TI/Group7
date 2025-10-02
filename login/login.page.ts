//login.page.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SharedService } from '../providers/shared.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { MenuController } from '@ionic/angular';
import { RastreioService } from '../providers/rastreio.service'; // Importe o serviço RastreioService

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';
  isUsernameFocused: boolean = false;
  isPasswordFocused: boolean = false;
  showPassword: boolean = false;
  errorMessage: string = ''; // Variável para a mensagem de erro
  rememberMe: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private sharedService: SharedService,
    private inAppBrowser: InAppBrowser,
    private menu: MenuController,
    private rastreioService: RastreioService
  ) { }

  ngOnInit() {
    // Se o usuário optou por lembrar suas credenciais, preencha automaticamente os campos de login
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    const storedRememberMe = localStorage.getItem('rememberMe');
    // Seleciona os elementos pelos IDs
    const facebookIcon = document.getElementById('facebookIcon');
    const linkedinIcon = document.getElementById('linkedinIcon');
    const instagramIcon = document.getElementById('instagramIcon');

    // URLs para redirecionamento
    const facebookUrl = 'https://www.facebook.com/eko7oficial';
    const linkedinUrl = "https://www.linkedin.com/company/eko'7/";
    const instagramUrl = 'https://www.instagram.com/eko7oficial/';
    // Adiciona o listener de evento de clique para cada ícone
    if (facebookIcon) {
      facebookIcon.addEventListener('click', () => {
        window.open(facebookUrl, '_blank');
      });
    }

    if (linkedinIcon) {
      linkedinIcon.addEventListener('click', () => {
        window.open(linkedinUrl, '_blank');
      });
    }

    if (instagramIcon) {
      instagramIcon.addEventListener('click', () => {
        window.open(instagramUrl, '_blank');
      });
    }

    if (storedUsername && storedPassword && storedRememberMe === 'true') {
      this.username = storedUsername;
      this.password = storedPassword;
      this.rememberMe = true;

      // Verifica se o usuário está desativado antes de tentar logar
      this.http.post('https://app.grupoeko7.com.br/checkUserStatus.php', { username: this.username })
        .subscribe((response: any) => {
          if (response.status === 'inactive') {
            // Se o usuário estiver desativado, limpa o localStorage e exibe uma mensagem de erro
            this.clearStoredCredentials();
            this.errorMessage = 'Usuario Desativado, Contate o suporte';
            console.error('Usuário desativado');
          } else {
            // Se o usuário estiver ativo, continue o processo de login
            if (!this.sharedService.getUserInfo()) {
              this.login();
            } else {
              this.menu.enable(true).then(() => {
                this.router.navigate(['/inicio']);
              });
            }
          }
        }, (error) => {
          console.error('Erro ao verificar o status do usuário:', error);
          this.errorMessage = 'Ocorreu um erro ao fazer login.';
        });
    }
  }

  login() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Por favor, preencha todos os campos.';
      return;
    }

    const apiUrl = 'https://app.grupoeko7.com.br/userlogin.php';
    const requestData = {
      username: this.username,
      password: this.password,
    };

    this.http.post(apiUrl, requestData).subscribe(
      (response: any) => {
        if (response.status === 'success') {
          // Lógica para login bem-sucedido
          this.sharedService.setUserInfo(response.data.usuario);
          if (this.rememberMe) {
            localStorage.setItem('username', this.username);
            localStorage.setItem('password', this.password);
            localStorage.setItem('rememberMe', 'true');
          } else {
            localStorage.removeItem('username');
            localStorage.removeItem('password');
            localStorage.removeItem('rememberMe');
          }

          this.menu.enable(true).then(() => {
            this.router.navigate(['/inicio']);
          });

          this.rastreioService.getPrevisoes(response.data.usuario).subscribe(data => {
            console.log("Dados recebidos:", data);
          }, error => {
            console.log("Erro ao obter previsão:", error);
          });
        } else if (response.status === 'inactive') {
          this.errorMessage = 'Usuário desativado. Favor contatar o suporte.';
        } else if (response.status === 'error') {
          this.errorMessage = 'Senha incorreta, Contate o suporte.';
        } else {
          this.errorMessage = 'Ocorreu um erro desconhecido. Por favor, tente novamente.';
        }
      },
      (error) => {
        console.error('Erro ao fazer login:', error);
        this.errorMessage = 'Erro ao tentar se conectar ao servidor. Tente novamente mais tarde.';
      }
    );
  }


  openCompanyWebsite() {
    const url = 'https://grupoeko7.com.br';
    const target = '_blank';
    const options = 'location=yes,toolbar=yes';

    this.inAppBrowser.create(url, target, options);
  }

  onUsernameFocus() {
    this.isUsernameFocused = true;
  }

  onUsernameBlur() {
    this.isUsernameFocused = false;
  }

  onPasswordFocus() {
    this.isPasswordFocused = true;
  }

  onPasswordBlur() {
    this.isPasswordFocused = false;
  }

  toggleRememberMe() {
    this.rememberMe = !this.rememberMe;
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  redirectToReset() {
    this.router.navigateByUrl('/resetsenha');
  }

  clearStoredCredentials() {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.removeItem('rememberMe');
  }

}
