import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTaskPopUpComponent } from './new-task-pop-up.component';

describe('NewTaskPopUpComponent', () => {
  let component: NewTaskPopUpComponent;
  let fixture: ComponentFixture<NewTaskPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewTaskPopUpComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewTaskPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
