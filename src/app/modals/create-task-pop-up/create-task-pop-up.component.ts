import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { TaskFrequenciesEnum } from 'src/app/shared-module/enums/task-frequencies.enum';
import { TaskService } from 'src/app/shared-module/services/task.service';
import { TrackerSettingsService } from 'src/app/shared-module/tracker/tracker-settings.service';
import { Task } from 'src/app/shared-module/types/task';

@Component({
  selector: 'app-create-task-pop-up',
  templateUrl: './create-task-pop-up.component.html',
  styleUrls: [
    './create-task-pop-up.component.scss',
    '../login-pop-up/login-pop-up.component.scss',
  ],
})
export class CreateTaskPopUpComponent implements OnInit {
  @ViewChild('picker') datePicker?: MatDatepicker<Date>;
  frequencies = Object.values(TaskFrequenciesEnum);
  isCustomizableFrequency = false;
  createTaskForm = <FormGroup>{};
  minDate = new Date();
  createTaskError?: string;

  constructor(
    private taskService: TaskService,
    private fb: FormBuilder,
    private dialogRef: MatDialog,
    private settings: TrackerSettingsService
  ) {}

  ngOnInit(): void {
    this.createTaskForm = this.buildFormGroup();
  }

  buildFormGroup(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      initialDate: [new Date(), Validators.required],
      allocatedTime: [
        '',
        [
          Validators.required,
          Validators.min(this.settings.pomodoro),
          Validators.max(1440),
        ],
      ],
      frequency: [TaskFrequenciesEnum.None, Validators.required],
      every: [1, [Validators.required, Validators.min(1), Validators.max(100)]],
    });
  }

  onSubmit() {
    if (this.createTaskForm.valid) {
      const newTask: Task = {
        id: '00000000-0000-0000-0000-000000000000',
        title: this.createTaskForm.value.title,
        initialDate: this.createTaskForm.value.initialDate,
        allocatedTime: this.createTaskForm.value.allocatedTime,
        frequency: {
          id: '00000000-0000-0000-0000-000000000000',
          frequencyValue: this.getFrequenciesEnumKeyByValue(
            this.createTaskForm.value.frequency
          ),
          every: this.createTaskForm.value.every,
          isCustom: this.createTaskForm.value.every > 1 ? true : false,
        },
        progress: 0,
      };
      this.taskService.createTask(newTask).subscribe({
        next: () => {
          this.dialogRef.closeAll();
        },
        error: (error) => {
          this.createTaskError = error;
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
      this.createTaskForm.value.frequency === TaskFrequenciesEnum.Day ||
      this.createTaskForm.value.frequency === TaskFrequenciesEnum.Month ||
      this.createTaskForm.value.frequency === TaskFrequenciesEnum.Year
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
