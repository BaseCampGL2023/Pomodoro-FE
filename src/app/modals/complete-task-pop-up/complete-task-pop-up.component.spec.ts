import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteTaskPopUpComponent } from './complete-task-pop-up.component';

describe('CompleteTaskPopUpComponent', () => {
  let component: CompleteTaskPopUpComponent;
  let fixture: ComponentFixture<CompleteTaskPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteTaskPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompleteTaskPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
