import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ValidationHelper } from '../pipes/validation-helper';

@Directive({
  selector: '[validationErrors]',
})
export class ValidationErrorsDirective {
  constructor(
    private container: ViewContainerRef,
    private template: TemplateRef<Object>
  ) {}

  @Input('validationErrorsControl')
  name = '';

  @Input('validationErrorsLabel')
  label?: string;

  @Input('validationErrors')
  formGroup?: FormGroup;

  ngOnInit() {
    const formatter = new ValidationHelper();
    if (this.formGroup && this.name) {
      const control = this.formGroup?.get(this.name);
      if (control) {
        control.statusChanges.subscribe(() => {
          if (this.container.length > 0) {
            this.container.clear();
          }
          if (control && control.dirty && control.invalid && control.errors) {
            formatter
              .formatMessages(control.errors, this.label ?? this.name)
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
