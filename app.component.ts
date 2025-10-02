import { Component, OnInit } from '@angular/core';
import { SharedService } from './providers/shared.service';
import { Platform } from '@ionic/angular';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators'; 
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  darkModeEnabled: boolean = false;
  mostrarMenuLateral: boolean = true;
  
  public appPages = [
    { title: 'Página Inicial', url: '/inicio', icon: 'home' },
    { title: 'Eventos', url: '/agenda', icon: 'calendar-number' },
    { title: 'Anúncios', url: '/anuncios', icon: 'megaphone' },
    { title: 'Catálogo', url: '/pastas-catalogo', icon: 'image' },
    { title: 'Rastreamento', url: '/rastreio', icon: 'location' },
    { title: "Eko'7 Saúde", url: 'https://eko7saude.com.br/', icon: 'assets/saude.png' },
    { title: "Eko'7 Pedidos", url: 'http://fabrica.grupoeko7.com.br:8020/', icon: 'assets/eko7.png' },
    { title: "Aboccato Pedidos", url: 'http://fabrica.grupoeko7.com.br:8025/', icon: 'assets/abboccato.png' },
    { title: "Materiais de Apoio", url: 'https://www.dropbox.com/scl/fo/76h5j1ake8efmliw0vux0/AMjVb4WkLrb7j-X7_FvU7pA?rlkey=1n75007hp27w3pn4ceg8lijeg&st=wrtkb7q1&dl=0', icon: 'assets/drop.png' },
  ];

  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(private platform: Platform, private router: Router, private sharedService: SharedService) {
    this.initializeApp();
  }

  ngOnInit() {
    this.sharedService.checkUserStatusPeriodically();

    // Verifica status ao carregar a página
    this.sharedService.checkUserStatus().subscribe((response: any) => {
      if (response.ativo === false) {
        this.sharedService.clearUserInfo();
        this.sharedService.clearLoginInfo();
        this.router.navigate(['/login']);
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.applyLightMode();
      this.router.events.pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd)
      ).subscribe((event: NavigationEnd) => {
        const isLoginPage = event.url === '/login' || event.urlAfterRedirects === '/login';
        this.mostrarMenuLateral = !isLoginPage;
      });
    });
  }

  applyLightMode() {
    document.body.classList.remove('dark');
  }

  openExternalLink(url: string) {
    window.open(url, '_self');
  }
}
