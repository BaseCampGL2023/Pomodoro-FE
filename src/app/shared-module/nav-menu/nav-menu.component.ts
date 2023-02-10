import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginPopUpComponent } from 'src/app/modals/login-pop-up/login-pop-up.component';
import { SettingsPopUpComponent } from 'src/app/modals/settings-pop-up/settings-pop-up.component';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
})
export class NavMenuComponent {
  isCollapsed = true;
  constructor(private dialogRef: MatDialog) {}
  openLogin() {
    this.dialogRef.open(LoginPopUpComponent);
  }
  openSettings() {
    this.dialogRef.open(SettingsPopUpComponent);
  }
}
