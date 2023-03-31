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
  maxAllocatedTime = 540;

  constructor(
    private taskService: TaskService,
    private fb: FormBuilder,
    private dialogRef: MatDialog,
    private settings: TrackerSettingsService
  ) {}

  ngOnInit(): void {
    const result = this.taskService.getCurrentTask();
    if (result !== undefined) {
      this.task = result;
    }
    this.editTaskForm = this.buildFormGroup();
    this.onSelect();
    this.minDate = new Date(this.task.initialDate);
  }

  buildFormGroup(): FormGroup {
    return this.fb.group({
      title: [this.task.title, [Validators.required, Validators.minLength(3)]],
      initialDate: [this.task.initialDate, Validators.required],
      allocatedTime: [
        this.task.allocatedTime / 60,
        [
          Validators.required,
          Validators.min(this.settings.pomodoro),
          Validators.max(this.maxAllocatedTime),
        ],
      ],
      frequency: [this.task.frequency.frequencyValue, Validators.required],
      every: [
        this.task.frequency.every,
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
    });
  }

  onSubmit() {
    if (this.editTaskForm.valid && this.taskIsChanged()) {
      const updatedTask: Task = this.getTaskFromForm();
      this.taskService.updateTask(updatedTask).subscribe({
        next: (task: Task) => {
          this.taskService.changeTodayTaskList();
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

  private getTaskFromForm(): Task {
    return {
      id: this.task.id,
      title: this.editTaskForm.value.title,
      initialDate: this.editTaskForm.value.initialDate,
      allocatedTime: this.editTaskForm.value.allocatedTime * 60,
      frequency: {
        id: this.task.frequency.id,
        frequencyValue: this.getFrequenciesEnumKeyByValue(
          this.editTaskForm.value.frequency
        ),
        every: this.editTaskForm.value.every,
        isCustom: this.editTaskForm.value.every > 1 ? true : false,
      },
      progress: this.task.progress,
    };
  }

  private taskIsChanged(): boolean {
    return (
      this.task.title !== this.editTaskForm.value.title ||
      this.task.initialDate !== this.editTaskForm.value.initialDate ||
      this.task.frequency.frequencyValue !==
        this.editTaskForm.value.frequency ||
      this.task.frequency.every !== this.editTaskForm.value.every ||
      this.task.allocatedTime !== this.editTaskForm.value.allocatedTime * 60
    );
  }

  private getFrequenciesEnumKeyByValue(value: string) {
    const indexOfS = Object.values(TaskFrequenciesEnum).indexOf(
      value as unknown as TaskFrequenciesEnum
    );
    const key = Object.keys(TaskFrequenciesEnum)[indexOfS];
    return key;
  }
}
