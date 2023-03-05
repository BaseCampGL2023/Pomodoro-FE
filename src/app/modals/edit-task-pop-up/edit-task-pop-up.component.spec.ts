import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaskPopUpComponent } from './edit-task-pop-up.component';

describe('EditTaskPopUpComponent', () => {
  let component: EditTaskPopUpComponent;
  let fixture: ComponentFixture<EditTaskPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTaskPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTaskPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
