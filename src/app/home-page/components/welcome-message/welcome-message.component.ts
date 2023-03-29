import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared-module/auth/auth.service';

@Component({
  selector: 'app-welcome-message',
  templateUrl: './welcome-message.component.html',
  styleUrls: ['./welcome-message.component.scss'],
})
export class WelcomeMessageComponent implements OnInit {
  @Input() isLoggedIn = false;
  userName?: string;

  constructor(private readonly authService: AuthService) {}
  
  ngOnInit(): void {
    this.userName = this.authService.getUserName();
  }
}
