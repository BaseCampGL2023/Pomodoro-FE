import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ValidationHelper } from '../pipes/validation-helper';

@Directive({
  selector: '[appValidationErrors]',
})
export class ValidationErrorsDirective implements OnInit {
  constructor(
    private container: ViewContainerRef,
    private template: TemplateRef<unknown>
  ) {}

  @Input('appValidationErrorsControl')
  control = '';

  @Input('appValidationErrorsLabel')
  label?: string;

  @Input('appValidationErrors')
  formGroup?: FormGroup;

  ngOnInit() {
    const formatter = new ValidationHelper();
    if (this.formGroup && this.control) {
      const control = this.formGroup?.get(this.control);
      if (control) {
        control.statusChanges.subscribe(() => {
          if (this.container.length > 0) {
            this.container.clear();
          }
          if (control && control.dirty && control.invalid && control.errors) {
            formatter
              .formatMessages(control.errors, this.label ?? this.control)
              .forEach((err) => {
                this.container.createEmbeddedView(this.template, {
                  $implicit: err,
                });
              });
          }
        });
      }
    }
  }
}
