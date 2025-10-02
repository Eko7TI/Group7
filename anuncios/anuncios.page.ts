import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SharedService } from '../providers/shared.service';

@Component({
  selector: 'app-anuncios',
  templateUrl: 'anuncios.page.html',
  styleUrls: ['anuncios.page.scss'],
})
export class AnunciosPage implements OnInit {
  mostrarBarraPesquisa = false;
  messages: any[] = [];
  termoPesquisa = '';

  constructor(private http: HttpClient, private sharedService: SharedService) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    const userInfo = this.sharedService.getUserInfo(); // Obtenha as informações do usuário
    const params = new HttpParams().set('usuarioCodigo', userInfo.codigo); // Adicione o código do usuário aos parâmetros

    this.http.get<any[]>('https://app.grupoeko7.com.br/anuncios.php', { params }).subscribe(
      data => {
        if (Array.isArray(data)) {
          this.messages = data.map(message => ({ ...message, isVisible: true }));
        } else {
          console.error('Expected an array but got:', data);
          this.messages = [];
        }
      },
      error => {
        console.error('Error fetching messages:', error);
        this.messages = [];
      }
    );
  }

  toggleBarraPesquisa() {
    this.mostrarBarraPesquisa = !this.mostrarBarraPesquisa;
  }

  onPesquisaChange(event: any) {
    const valor = event.detail.value;
    this.termoPesquisa = valor;
    if (valor.trim() !== '') {
      this.messages = this.messages.filter(message =>
        message.titulo.toLowerCase().includes(valor.toLowerCase()) ||
        message.mensagem.toLowerCase().includes(valor.toLowerCase())
      );
    } else {
      this.loadMessages();
    }
  }

  toggleMessageVisibility(index: number) {
    this.messages[index].isVisible = !this.messages[index].isVisible;
  }
}
