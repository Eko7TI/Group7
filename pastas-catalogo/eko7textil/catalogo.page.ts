import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { CatalogoService } from '../catalogo.service';
import * as Hammer from 'hammerjs';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { NavController } from '@ionic/angular';
import { LocalNotifications } from '@capacitor/local-notifications';
import { FileOpener } from '@ionic-native/file-opener/ngx';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss']
})
export class CatalogoPage implements OnInit, AfterViewChecked{
  public imagensCatalogo: string[] = [];
  isZoomed: boolean = false;
  initialized: boolean = false;
  private isDragging: boolean = false;
  private startX = 0;
  private startY = 0;
  private imgElement: HTMLImageElement | null = null;


  constructor(
    private catalogoService: CatalogoService,
    private navCtrl: NavController,
    private fileOpener: FileOpener
  ) {
    // Listener para capturar o clique na notificação
    LocalNotifications.addListener('localNotificationActionPerformed', (notificationAction) => {
      const { notification } = notificationAction;
      console.log('Notificação recebida:', notification);
      if (notification.actionTypeId === 'OPEN_IMAGE' && notification.extra?.filePath) {
        this.openImage(notification.extra.filePath);
      }
    });

  }

  async ngOnInit() {
    console.log('Inicializando Eko7Textil...');
    await this.requestNotificationPermission();
    this.catalogoService.getCatalogo('Eko7Textil').subscribe(catalogo => {
      console.log('Catalogo recebido:', catalogo);
      this.imagensCatalogo = catalogo ? catalogo.imagens : [];
    });
  }

  async requestNotificationPermission() {
    console.log('Solicitando permissão para notificações...');
    const { display } = await LocalNotifications.requestPermissions();
    if (display === 'granted') {
      console.log('Permissão para notificações concedida!');
    } else {
      console.error('Permissão para notificações negada!');
    }
  }

  ngAfterViewChecked() {
    if (!this.initialized && this.imagensCatalogo.length > 0) {
      console.log('Inicializando Hammer.js...');
      this.initializeHammer();
      this.initialized = true;
    }
  }

  async showDownloadNotification(id: number, title: string, body: string) {
    console.log(`Mostrando notificação de download [ID: ${id}] - Título: ${title}, Corpo: ${body}`);
    await LocalNotifications.schedule({
      notifications: [
        {
          id,
          title,
          body,
          ongoing: true,
        },
      ],
    });
  }

  async updateDownloadNotification(id: number, body: string) {
    console.log(`Atualizando notificação de download [ID: ${id}] - Corpo: ${body}`);
    await LocalNotifications.schedule({
      notifications: [
        {
          id,
          body,
          ongoing: true,
          title: "Atualização de download",
        },
      ],
    });
  }

  async showDownloadCompleteNotification(id: number, title: string, body: string, actionTypeId: string, filePath?: string) {
    console.log(`Mostrando notificação de download completo [ID: ${id}] - Título: ${title}, Corpo: ${body}, ActionTypeId: ${actionTypeId}, Caminho do Arquivo: ${filePath}`);
    await LocalNotifications.schedule({
      notifications: [
        {
          id,
          title,
          body,
          ongoing: false,
          actionTypeId,
          extra: filePath ? { filePath } : {},
        },
      ],
    });
  }
  
  openImage(filePath: string) {
    console.log(`Abrindo imagem com o caminho: ${filePath}`);
    if (filePath.startsWith('file://')) {
      // Caminho para a imagem salvo localmente
      this.fileOpener.open(filePath, 'image/jpeg').then(() => {
        console.log('Imagem aberta com sucesso!');
      }).catch(e => {
        console.error('Erro ao abrir imagem:', e);
        alert('Erro ao abrir a imagem. Tente novamente.');
      });
    } else {
      // Se o caminho não começa com 'file://', pode ser necessário tratar de outra forma
      this.navCtrl.navigateForward('/image-viewer', { queryParams: { path: filePath } });
    }
  }

  initializeHammer() {
    const containers = document.querySelectorAll('.zoom-container');
    containers.forEach(container => {
      const element = container as HTMLElement;
      const hammer = new Hammer(element);
      hammer.get('doubletap').set({ taps: 2 });

      hammer.on('doubletap', (event) => {
        console.log('Evento de doubletap detectado:', event);
        this.onImageClick(event);
      });
    });
  }

  onMouseClick(event: MouseEvent) {
    console.log('Clique do mouse detectado:', event);
    const target = event.currentTarget as HTMLElement;
    this.performZoom(event.clientX, event.clientY, target);
  }

  onImageClick(event: HammerInput) {
    console.log('Clique na imagem detectado:', event);
    const target = event.target as HTMLElement;
    this.performZoom(event.center.x, event.center.y, target);
  }

  onMouseDown(event: MouseEvent) {
    console.log('Pressionamento do mouse detectado:', event);
    if (this.isZoomed) {
      this.isDragging = true;
      this.startX = event.clientX;
      this.startY = event.clientY;
      this.imgElement = (event.currentTarget as HTMLElement).querySelector('img') as HTMLImageElement;

      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);
    }
  }

  onTouchStart(event: TouchEvent) {
    console.log('Início do toque detectado:', event);
    if (this.isZoomed && event.touches.length > 0) {
      this.isDragging = true;
      this.startX = event.touches[0].clientX;
      this.startY = event.touches[0].clientY;
      this.imgElement = (event.currentTarget as HTMLElement).querySelector('img') as HTMLImageElement;

      document.addEventListener('touchmove', this.onTouchMove);
      document.addEventListener('touchend', this.onTouchEnd);
    }
  }

  onMouseMove = (event: MouseEvent) => {
    console.log('Movimento do mouse detectado:', event);
    if (this.isDragging && this.imgElement) {
      const deltaX = event.clientX - this.startX;
      const deltaY = event.clientY - this.startY;
      this.updateImagePosition(deltaX, deltaY);
      this.startX = event.clientX;
      this.startY = event.clientY;
    }
  };

  onTouchMove = (event: TouchEvent) => {
    console.log('Movimento do toque detectado:', event);
    if (this.isDragging && this.imgElement && event.touches.length > 0) {
      const deltaX = event.touches[0].clientX - this.startX;
      const deltaY = event.touches[0].clientY - this.startY;
      this.updateImagePosition(deltaX, deltaY);
      this.startX = event.touches[0].clientX;
      this.startY = event.touches[0].clientY;
    }
  };

  onMouseUp = () => {
    console.log('Liberação do mouse detectada.');
    this.isDragging = false;
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  };

  onTouchEnd = () => {
    console.log('Fim do toque detectado.');
    this.isDragging = false;
    document.removeEventListener('touchmove', this.onTouchMove);
    document.removeEventListener('touchend', this.onTouchEnd);
  };

  updateImagePosition(deltaX: number, deltaY: number) {
    if (this.imgElement) {
      const transform = window.getComputedStyle(this.imgElement).transform;
      const matrix = new DOMMatrix(transform);
      this.imgElement.style.transform = `translate(${matrix.m41 + deltaX}px, ${matrix.m42 + deltaY}px) scale(${this.isZoomed ? 2 : 1})`;
    }
  }

  performZoom(clientX: number, clientY: number, target: HTMLElement) {
    console.log('Executando zoom:', clientX, clientY, target);
    const imgElement = target.querySelector('img') as HTMLImageElement;

    if (imgElement) {
      const rect = imgElement.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      if (!this.isZoomed) {
        this.isZoomed = true;
        const scale = 2;
        const offsetX = (x / imgElement.width) * 100;
        const offsetY = (y / imgElement.height) * 100;

        imgElement.style.transformOrigin = `${offsetX}% ${offsetY}%`;
        imgElement.style.transform = `scale(${scale})`;
      } else {
        this.isZoomed = false;
        imgElement.style.transform = 'scale(1)';
      }
    } else {
      console.error('Imagem não encontrada no contêiner');
    }
  }

  confirmDownload(event: MouseEvent, url: string) {
    console.log('Confirmação de download da imagem:', url);
    event.stopPropagation();

    if (confirm("Deseja baixar esta imagem?")) {
      this.downloadImage(url);
    }
  }

  async downloadImage(url: string) {
    console.log('Iniciando download da imagem:', url);
    try {
      await this.showDownloadNotification(2, "Baixando imagem", "Progresso: 0%");

      const response = await fetch(url);
      const blob = await response.blob();
      const fileName = url.substring(url.lastIndexOf('/') + 1);
      const base64data = await this.blobToBase64(blob);

      await Filesystem.writeFile({
        path: fileName,
        data: base64data.split(',')[1],
        directory: Directory.Documents,
      });

      await this.showDownloadCompleteNotification(2, "Download completo", "Imagem salva na Galeria", 'OPEN_IMAGE', `path/to/saved/${fileName}`);
    } catch (error) {
      console.error('Erro ao baixar a imagem:', error);
      alert('Erro ao baixar a imagem. Tente novamente.');
    }
  }
  
  async blobToBase64(blob: Blob): Promise<string> {
    console.log('Convertendo Blob para Base64...');
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log('Blob convertido para Base64 com sucesso.');
        resolve(reader.result as string);
      };
      reader.onerror = (error) => {
        console.error('Erro ao converter Blob para Base64:', error);
        reject(error);
      };
      reader.readAsDataURL(blob);
    });
  }
}
