import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from 'src/app/shared-module/services/task.service';
import { Task } from 'src/app/shared-module/types/task';
import { NumberValidator } from 'src/app/shared-module/validation/number';

@Component({
  selector: 'app-edit-task-pop-up',
  templateUrl: './edit-task-pop-up.component.html',
  styleUrls: [
    './edit-task-pop-up.component.scss',
    '../login-pop-up/login-pop-up.component.scss',
  ],
})
export class EditTaskPopUpComponent implements OnInit {
  @ViewChild('picker') datePicker?: MatDatepicker<Date>;
  task = <Task>{};
  frequencies = <string[]>{};
  editTaskForm = <FormGroup>{};
  minDate = new Date();
  editTaskResult?: any;

  constructor(
    private dialog: MatDialog,
    private taskService: TaskService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.taskService
      .getCurrentTask()
      .subscribe((result) => (this.task = result));
    this.frequencies = this.taskService.getFrequencies();
    this.editTaskForm = this.buildFormGroup();
    this.minDate = this.task.initialDate;
  }

  buildFormGroup(): FormGroup {
    return this.fb.group({
      title: [this.task.title, [Validators.required, Validators.minLength(3)]],
      initialDate: [this.task.initialDate, Validators.required],
      allocatedTime: [
        this.task.allocatedTime,
        [Validators.required, NumberValidator.number(0, 1440)],
      ],
      frequency: [this.task.frequency, Validators.required],
    });
  }

  openDatePicker() {
    this.datePicker?.open();
  }

  onSubmit() {
    // TODO
    if (this.editTaskForm.valid) {
      this.task.title = this.editTaskForm.controls['title'].value;
      this.task.initialDate = this.editTaskForm.controls['initialDate'].value;
      this.task.allocatedTime =
        this.editTaskForm.controls['allocatedTime'].value;
      this.task.frequency = this.editTaskForm.controls['frequency'].value;
      this.taskService.updateTask(this.task).subscribe({
        error: (error) => {
          if (!error?.error?.success) {
            this.editTaskResult = error.error;
            this.resetForm();
          }
        },
      });
    }
  }

  resetForm() {
    this.editTaskForm.reset();
  }
}
