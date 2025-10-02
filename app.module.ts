import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { MatDialogModule } from '@angular/material/dialog'; // Modulo para o funcionamento Popup
import { MatIconModule } from '@angular/material/icon'; // Icones de modulo popup
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './providers/auth.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx'; // Importe InAppBrowser
import { RouterModule } from '@angular/router'; // Importe RouterModule
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SQLite } from '@ionic-native/sqlite/ngx'; // Importe o SQLite
import { GoogleMapsModule } from '@angular/google-maps';
import { LoadingController } from '@ionic/angular';
import { FileOpener } from '@ionic-native/file-opener/ngx';





@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, MatDialogModule,
    MatIconModule, RouterModule, GoogleMapsModule],
  providers: [
    FileOpener,
    LoadingController,
    StatusBar,
    SplashScreen,
    AuthService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Geolocation,  // Este é o objeto Provider
    InAppBrowser, // Adicione InAppBrowser aos providers
    SQLite // Adicione o SQLite aos providers
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
console.log('Inicializando o aplicativo');
