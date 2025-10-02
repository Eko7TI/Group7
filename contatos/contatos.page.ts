import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.page.html',
  styleUrls: ['./contatos.page.scss'],
})
export class ContatosPage implements OnInit {

  contatos: any = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.carregarContatos();
  }

  carregarContatos() {
    this.http.get('https://app.grupoeko7.com.br/contatos.php').subscribe((data: any) => {
      this.contatos = data;
    });
  }
}
