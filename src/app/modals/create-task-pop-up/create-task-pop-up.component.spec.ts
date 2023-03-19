import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTaskPopUpComponent } from './create-task-pop-up.component';

describe('CreateTaskPopUpComponent', () => {
  let component: CreateTaskPopUpComponent;
  let fixture: ComponentFixture<CreateTaskPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTaskPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTaskPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
