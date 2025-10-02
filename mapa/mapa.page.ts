import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { MapaService } from './mapa-service.service';

declare var google: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
  latitude!: number;
  longitude!: number;
  map: any;
  truckMarkers: any[] = [];
  veiculo!: string;

  @ViewChild('map', { static: true }) mapElement!: ElementRef;

  constructor(
    private geolocation: Geolocation,
    private mapaService: MapaService,
  ) { }

  ngOnInit() {
    this.getLocation();
  }

  getLocation() {
    this.geolocation.getCurrentPosition().then((resp: Geoposition) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.showMap();
    }).catch((error) => {
      console.log('Geolocation error', error);
    });
  }

  showMap() {
    const mapOptions = {
      center: new google.maps.LatLng(this.latitude, this.longitude),
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    const veiculoFromLocalStorage = localStorage.getItem('veiculo');
    console.log('Veículo do localStorage:', veiculoFromLocalStorage);

    if (veiculoFromLocalStorage && typeof veiculoFromLocalStorage === 'string') {
      console.log('Nome do veículo:', veiculoFromLocalStorage);
      this.fetchTruckLocations(veiculoFromLocalStorage);
    } else {
      console.log('Nenhum veículo salvo no localStorage. Exibindo todos os marcadores.');
      this.fetchTruckLocations();
    }
  }

  fetchTruckLocations(veiculo?: string) {
    this.mapaService.getTruckLocations().subscribe(trucks => {
      console.log('Trucks:', trucks);
      this.truckMarkers.forEach(marker => marker.setMap(null));
      this.truckMarkers = [];

      trucks.forEach(truck => {
        if ((!veiculo || truck.name === veiculo) && typeof truck.randomLatitude === 'number' && typeof truck.randomLongitude === 'number') {
          const circleRadiusInDegrees = 500 / 111000;

          const angle = Math.random() * Math.PI * 2;
          const radius = Math.sqrt(Math.random()) * circleRadiusInDegrees;
          const offsetLat = radius * Math.cos(angle);
          const offsetLng = radius * Math.sin(angle) / Math.cos(truck.randomLatitude * Math.PI / 180);

          const truckPosition = new google.maps.LatLng(truck.randomLatitude + offsetLat, truck.randomLongitude + offsetLng);

          // Desenhando o círculo no mapa
          const circleAngle = Math.random() * Math.PI * 2;
          const circleRadius = Math.sqrt(Math.random()) * circleRadiusInDegrees;
          const circleOffsetLat = circleRadius * Math.cos(circleAngle);
          const circleOffsetLng = circleRadius * Math.sin(circleAngle) / Math.cos(truck.randomLatitude * Math.PI / 180);

          const circleCenter = new google.maps.LatLng(truck.randomLatitude + circleOffsetLat, truck.randomLongitude + circleOffsetLng);

          const circle = new google.maps.Circle({
            strokeColor: '#0000FF',
            strokeOpacity: 0.5,
            strokeWeight: 2,
            fillColor: '#0000FF',
            fillOpacity: 0.2,
            map: this.map,
            center: circleCenter,
            radius: 11000
          });

          // Centralizando o mapa no centro do círculo azul
          this.map.setCenter(circleCenter);
        }
      });
    });
  }
}
