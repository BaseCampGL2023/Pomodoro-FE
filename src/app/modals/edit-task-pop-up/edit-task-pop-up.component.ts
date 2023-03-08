import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { TaskFrequenciesEnum } from 'src/app/shared-module/enums/task-frequencies.enum';
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
  frequencies = Object.values(TaskFrequenciesEnum);
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
    if (this.editTaskForm.valid && this.taskIsChanged()) {
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
    } else {
      this.dialogRef.closeAll();
    }
  }

  resetForm() {
    this.editTaskForm.reset();
  }

  openDatePicker() {
    this.datePicker?.open();
  }

  taskIsChanged(): boolean {
    return (
      this.task.title !== this.editTaskForm.value.title ||
      this.task.initialDate !== this.editTaskForm.value.initialDate ||
      this.task.frequency !== this.editTaskForm.value.frequency ||
      this.task.allocatedTime !== this.editTaskForm.value.allocatedTime
    );
  }
}
