import { Component, OnInit } from '@angular/core';
import { DefaultUserAuthService } from '../services/default-user-auth.service';

@Component({
  selector: 'app-loginDefaultUser',
  templateUrl: './loginDefaultUser.component.html',
  styleUrls: ['./loginDefaultUser.component.css']
})
export class LoginDefaultUserComponent implements OnInit {

  constructor(private defaulUserAuth: DefaultUserAuthService) { }

  loginUser: any = {};

  ngOnInit() {
  }

  login() {
    this.defaulUserAuth.login(this.loginUser);
  }
}
