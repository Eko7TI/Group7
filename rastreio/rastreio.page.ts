import { Component, OnInit } from '@angular/core';
import { SharedService } from '../providers/shared.service';
import { RastreioService } from '../providers/rastreio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rastreio',
  templateUrl: './rastreio.page.html',
  styleUrls: ['./rastreio.page.scss'],
})
export class RastreioPage implements OnInit {
  previsao: any;
  usuario!: string;
  mapa: any;

  constructor(
    private sharedService: SharedService, 
    private rastreioService: RastreioService,
    private router: Router) { }

  ngOnInit() {
    // Obtenha automaticamente o nome de usuário do serviço de autenticação
    const userInfo = this.sharedService.getUserInfo();
    this.usuario = userInfo.usuario; // Atribui o nome de usuário obtido à variável 'usuario'

    // Chame o serviço RastreioService com o nome de usuário obtido para obter a previsão
    this.rastreioService.getPrevisoes(this.usuario).subscribe(data => {
      console.log("Dados recebidos da previsão:", data); // Adicione este console.log para verificar os dados
      if (!data) {
        this.previsao = null; // ou qualquer outro tratamento necessário
        console.log("Resposta inválida do servidor");
      } else if (data.message) {
        this.previsao = null; // ou qualquer outro tratamento necessário
        console.log(data.message); // ou exiba uma mensagem de erro no seu aplicativo
      } else {
        this.previsao = data;
      }
    }, error => {
      console.log("Erro ao obter previsão:", error);
    });

    // Chame o serviço RastreioService com o nome de usuário obtido para obter informações do mapa
    this.rastreioService.getInfoMapa(this.usuario).subscribe(data => {
      console.log("Dados recebidos do mapa:", data); // Adicione este console.log para verificar os dados
      if (!data || data.length === 0) {
        this.mapa = null; // ou qualquer outro tratamento necessário
        console.log("Resposta inválida do servidor");
      } else if (data.message) {
        this.mapa = null; // ou qualquer outro tratamento necessário
        console.log(data.message); // ou exiba uma mensagem de erro no seu aplicativo
      } else {
        this.mapa = data[0]; // Acessa o primeiro elemento do array
      }
    }, error => {
      console.log("Erro ao obter informações do mapa:", error);
    });
  }


  redirectToMap() {
    console.log("Redirecionando para o mapa...");
    this.router.navigateByUrl('/mapa');
    this.salvarVeiculoLocalStorage(); // Chame a função para salvar o nome do veículo ao redirecionar para a página do mapa
  }

  salvarVeiculoLocalStorage() {
    console.log("Salvando veículo no LocalStorage:", this.mapa.veiculo);
    localStorage.setItem('veiculo', this.mapa.veiculo); // Salve o nome do veículo no localStorage
  }
}
