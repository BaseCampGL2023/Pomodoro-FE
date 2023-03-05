import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTaskPopUpComponent } from './delete-task-pop-up.component';

describe('DeleteTaskPopUpComponent', () => {
  let component: DeleteTaskPopUpComponent;
  let fixture: ComponentFixture<DeleteTaskPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteTaskPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteTaskPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
