import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RastreioPage } from './rastreio.page';

describe('RastreioPage', () => {
  let component: RastreioPage;
  let fixture: ComponentFixture<RastreioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RastreioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
