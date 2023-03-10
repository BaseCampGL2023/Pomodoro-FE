import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatDatepicker } from '@angular/material/datepicker';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../shared-module/services/task.service';
import { NewTask } from '../../shared-module/types/new-task';
import { TaskFrequenciesEnum } from '../../shared-module/enums/task-frequencies.enum';
import { NumberValidator } from 'src/app/shared-module/validation/number';

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
  public taskFrequencies = TaskFrequenciesEnum;

  private _selectedDate = new Date();
  private _indexOfFreq = Object.values(this.taskFrequencies).indexOf(
    'Doesn`t repeat' as unknown as TaskFrequenciesEnum
  );
  private _selectedFrequency =
    Object.keys(TaskFrequenciesEnum)[this._indexOfFreq];

  get selectedDate(): Date {
    return this._selectedDate;
  }

  set selectedDate(value: Date) {
    this._selectedDate = value;
  }

  get selectedFrequency(): string {
    return this._selectedFrequency;
  }

  set selectedFrequency(value: string) {
    this._selectedFrequency = value;
  }

  newTaskForm: FormGroup = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
    }),
    initialDate: new FormControl(this.selectedDate, {
      initialValueIsDefault: true,
    }),
    frequency: new FormControl(this.selectedFrequency, {
      initialValueIsDefault: true,
    }),
    allocatedTime: new FormControl('', {
      validators: [Validators.required, NumberValidator.number(0, 1440)],
    }),
  });

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private taskService: TaskService
  ) {
    this.newTaskForm.reset(this.newTask);
  }

  onSubmit() {
    if (this.newTaskForm.valid) {
      Object.assign(this.newTask, this.newTaskForm.value);
      console.log(this.newTask);
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
