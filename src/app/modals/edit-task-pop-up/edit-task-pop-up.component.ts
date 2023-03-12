import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { TaskFrequenciesEnum } from 'src/app/shared-module/enums/task-frequencies.enum';
import { TaskService } from 'src/app/shared-module/services/task.service';
import { TrackerSettingsService } from 'src/app/shared-module/tracker/tracker-settings.service';
import { Task } from 'src/app/shared-module/types/task';

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
  isCustomizableFrequency = true;
  editTaskForm = <FormGroup>{};
  minDate = new Date();
  editTaskError?: string;

  constructor(
    private taskService: TaskService,
    private fb: FormBuilder,
    private dialogRef: MatDialog,
    private settings: TrackerSettingsService
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
        [
          Validators.required,
          Validators.min(this.settings.pomodoro),
          Validators.max(1440),
        ],
      ],
      frequency: [this.task.frequency.frequencyType, Validators.required],
      every: [
        this.task.frequency.every,
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
    });
  }

  onSubmit() {
    if (this.editTaskForm.valid && this.taskIsChanged()) {
      this.task.title = this.editTaskForm.value.title;
      this.task.initialDate = this.editTaskForm.value.initialDate;
      this.task.allocatedTime = this.editTaskForm.value.allocatedTime;
      this.task.frequency.frequencyType = this.getFrequenciesEnumKeyByValue(
        this.editTaskForm.value.frequency
      );
      this.task.frequency.every = this.editTaskForm.value.every;
      this.task.frequency.isCustom =
        this.editTaskForm.value.every > 1 ? true : false;

      this.taskService.updateTask(this.task).subscribe({
        next: () => {
          this.dialogRef.closeAll();
        },
        error: (error) => {
          this.editTaskError = error;
        },
      });
    } else {
      this.dialogRef.closeAll();
    }
  }

  openDatePicker() {
    this.datePicker?.open();
  }

  taskIsChanged(): boolean {
    return (
      this.task.title !== this.editTaskForm.value.title ||
      this.task.initialDate !== this.editTaskForm.value.initialDate ||
      this.task.frequency.frequencyType !== this.editTaskForm.value.frequency ||
      this.task.frequency.every !== this.editTaskForm.value.every ||
      this.task.allocatedTime !== this.editTaskForm.value.allocatedTime
    );
  }

  onSelect() {
    if (
      this.editTaskForm.value.frequency === TaskFrequenciesEnum.Day ||
      this.editTaskForm.value.frequency === TaskFrequenciesEnum.Month ||
      this.editTaskForm.value.frequency === TaskFrequenciesEnum.Year
    ) {
      this.isCustomizableFrequency = true;
    } else {
      this.isCustomizableFrequency = false;
    }
  }

  getFrequenciesEnumKeyByValue(value: string) {
    const indexOfS = Object.values(TaskFrequenciesEnum).indexOf(
      value as unknown as TaskFrequenciesEnum
    );
    const key = Object.keys(TaskFrequenciesEnum)[indexOfS];
    return key;
  }
}
