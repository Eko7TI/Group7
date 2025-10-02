import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {
  @Input() latitude!: number | null;
  @Input() longitude!: number | null;
  mapOptions!: google.maps.MapOptions;
  markerOptions!: google.maps.MarkerOptions;
  showMap = false;

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    if (this.latitude !== null && this.longitude !== null && !isNaN(this.latitude) && !isNaN(this.longitude) && this.latitude !== 0 && this.longitude !== 0) {
      this.mapOptions = {
        center: { lat: Number(this.latitude), lng: Number(this.longitude) },
        zoom: 15
      };

      this.markerOptions = {
        position: { lat: Number(this.latitude), lng: Number(this.longitude) }
      };

      this.showMap = true;
    } else {
      console.error('Invalid latitude or longitude');
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
