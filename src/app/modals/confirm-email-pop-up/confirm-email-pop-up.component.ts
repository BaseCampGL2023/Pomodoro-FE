import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AuthMatDialogData } from 'src/app/shared-module/types/auth-mat-dialog-data';
import { LoginPopUpComponent } from '../login-pop-up/login-pop-up.component';

@Component({
  selector: 'app-confirm-email-pop-up',
  templateUrl: './confirm-email-pop-up.component.html',
  styleUrls: [
    './confirm-email-pop-up.component.scss',
    '../login-pop-up/login-pop-up.component.scss',
  ],
})
export class ConfirmEmailPopUpComponent {
  constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private authMatDialogData?: AuthMatDialogData
  ) {}

  public onConfirmed() {
    this.toSignIn();
  }

  private toSignIn() {
    this.dialog.closeAll();
    this.dialog.open(LoginPopUpComponent, {
      data: this.authMatDialogData,
    });
  }
}
