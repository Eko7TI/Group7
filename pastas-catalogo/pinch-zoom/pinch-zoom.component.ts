// pinch-zoom.component.ts
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import * as Hammer from 'hammerjs'; // Adicione esta linha para importar HammerJS

export class MyHammerConfig extends HammerGestureConfig {
  override overrides = {
    pinch: { enable: true },
  };
}

@Component({
  selector: 'app-pinch-zoom',
  template: `
    <div #pinchZoomContainer class="pinch-zoom-container">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .pinch-zoom-container {
      touch-action: none;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig,
    },
  ],
})
export class PinchZoomComponent implements OnInit {
  @ViewChild('pinchZoomContainer', { static: true }) pinchZoomContainer!: ElementRef;

  private scale = 1;
  private lastScale = 1;

  ngOnInit() {
    const hammer = new Hammer(this.pinchZoomContainer.nativeElement);
    hammer.get('pinch').set({ enable: true });

    hammer.on('pinch', (ev) => this.onPinch(ev));
    hammer.on('pinchend', (ev) => this.onPinchEnd(ev));
  }

  onPinch(ev: any) {
    this.scale = this.lastScale * ev.scale;
    this.applyTransform();
  }

  onPinchEnd(ev: any) {
    this.lastScale = this.scale;
  }

  private applyTransform() {
    this.pinchZoomContainer.nativeElement.style.transform = `scale(${this.scale})`;
  }
}
