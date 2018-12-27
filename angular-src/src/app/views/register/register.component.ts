import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {
  username: string;
  email: string;
  password: string;

  constructor() { }

}
