import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { MapaComponent } from '../mapa/mapa.component';  // Ajuste o caminho conforme necessário

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage implements OnInit {
  agendaData!: any[];

  constructor(private http: HttpClient, private modalController: ModalController) { }

  ngOnInit() {
    this.getAgendaData();
  }

  getAgendaData() {
    const currentDate = new Date();
    const endDate = new Date();
    endDate.setMonth(currentDate.getMonth() + 3);

    const params = new HttpParams()
      .set('startDate', currentDate.toISOString().split('T')[0]) // Formata a data para 'YYYY-MM-DD'
      .set('endDate', endDate.toISOString().split('T')[0]);

    this.http.get<any[]>('https://app.grupoeko7.com.br/eventos.php', { params }).subscribe(data => {
      this.agendaData = data.map(item => ({
        ...item,
        latitude: Number(item.latitude),  // Converte para número
        longitude: Number(item.longitude) // Converte para número
      }));
    });
  }

  async openMap(latitude: number, longitude: number) {
    const modal = await this.modalController.create({
      component: MapaComponent,
      componentProps: {
        latitude: Number(latitude),
        longitude: Number(longitude)
      }
    });
    return await modal.present();
  }
}
