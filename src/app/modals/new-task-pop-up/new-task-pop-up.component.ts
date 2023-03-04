import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatDatepicker } from '@angular/material/datepicker';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../shared-module/services/task.service';
import { NewTask } from '../../shared-module/types/new-task';
import { TaskFrequenciesEnum } from '../../shared-module/enums/task-frequencies.enum';

@Component({
  selector: 'app-new-task-pop-up',
  templateUrl: './new-task-pop-up.component.html',
  styleUrls: [
    '../login-pop-up/login-pop-up.component.scss',
    './new-task-pop-up.component.scss',
  ],
})
export class NewTaskPopUpComponent {
  @ViewChild('picker') datePicker?: MatDatepicker<Date>;
  newTask = <NewTask>{};
  private _selectedDay: Date;
  public taskFrequencies = TaskFrequenciesEnum;

  get selectedDay(): Date {
    return this._selectedDay;
  }

  set selectedDay(value: Date) {
    this._selectedDay = value;
  }

  newTaskForm: FormGroup = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required],
    }),
    initialDate: new FormControl('', {
      validators: [Validators.required],
    }),
    frequency: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private taskService: TaskService
  ) {
    this.newTaskForm.reset(this.newTask);
    this._selectedDay = new Date();
  }

  onSubmit() {
    console.log(this.selectedDay);
    if (this.newTaskForm.valid) {
      Object.assign(this.newTask, this.newTaskForm.value);
    }
  }

  resetForm() {
    this.newTask = <NewTask>{};
    this.newTaskForm.reset();
  }

  openDatePicker() {
    this.datePicker?.open();
  }
}
