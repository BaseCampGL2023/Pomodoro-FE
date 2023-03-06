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
    private taskService: TaskService,
    private fb: FormBuilder,
    private dialogRef: MatDialog
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

  onSubmit() {
    // TODO
    if (this.editTaskForm.valid) {
      Object.assign(this.task, this.editTaskForm.value);
      this.taskService.updateTask(this.task).subscribe({
        next: () => {
          this.dialogRef.closeAll();
        },
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

  openDatePicker() {
    this.datePicker?.open();
  }
}
