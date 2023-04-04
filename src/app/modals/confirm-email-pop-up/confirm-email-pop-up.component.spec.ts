import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmEmailPopUpComponent } from './confirm-email-pop-up.component';

describe('ConfirmEmailPopUpComponent', () => {
  let component: ConfirmEmailPopUpComponent;
  let fixture: ComponentFixture<ConfirmEmailPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmEmailPopUpComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmEmailPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
