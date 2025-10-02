import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PastasCatalogoPage } from './pastas-catalogo.page';

describe('PastasCatalogoPage', () => {
  let component: PastasCatalogoPage;
  let fixture: ComponentFixture<PastasCatalogoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PastasCatalogoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
