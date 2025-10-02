import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MadressenzaPage } from './madressenza.page';

describe('MadressenzaPage', () => {
  let component: MadressenzaPage;
  let fixture: ComponentFixture<MadressenzaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MadressenzaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
