import { Component, OnInit } from '@angular/core';
import { LoginUser } from '../models/loginUser';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-loginUser',
  templateUrl: './loginUser.component.html',
  styleUrls: ['./loginUser.component.css']
})
export class LoginUserComponent implements OnInit {

  constructor(private authService: AuthService) { }

  loginUser: any = {};

  ngOnInit() {
  }

  login() {
    this.authService.login(this.loginUser);
  }

}
