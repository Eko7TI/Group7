import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetsenhaPage } from './resetsenha.page';

describe('ResetsenhaPage', () => {
  let component: ResetsenhaPage;
  let fixture: ComponentFixture<ResetsenhaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ResetsenhaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
