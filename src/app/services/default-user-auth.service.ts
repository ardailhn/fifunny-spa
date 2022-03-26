import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginDefaultUser } from '../models/loginDefaultUser';
import { RegisterDefaultUser } from '../models/registerDefaultUser';
import { AlertifyService } from './alertify.service';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class DefaultUserAuthService {

  path!: string;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private alertifyService: AlertifyService,
    private globalService: GlobalService,
  ) {
    this.path = globalService.API_PATH + "DefaultUsers/" ;
  }

  userToken: any;
  decodedToken: any;
  helper = new JwtHelperService();
  TOKEN_KEY = "token_id";

  login(loginUser: LoginDefaultUser) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    this.httpClient
      .post(this.path + 'login', loginUser, { headers: headers })
      .subscribe(data => {
        const token = (<any>data).token;
        this.saveToken(token);
        this.userToken = token;
        this.decodedToken = this.helper.decodeToken(token);
        this.alertifyService.success("Giriş başarılı");
        this.router.navigateByUrl('/place');
      }, err => {
        this.alertifyService.error("Kullanıcı bilgileri hatalı!")
      });
  }

  register(registerUser: RegisterDefaultUser) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.httpClient
      .post(this.path + 'register', registerUser, { headers: headers })
      .subscribe((data) => {
        this.alertifyService.success("Kayıt başarılı");
        this.router.navigateByUrl('/login');
      }, err => {
        this.alertifyService.error("Kayıt işlemi Başarısız!!!")
      });
  }

  logOut() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  saveToken(token) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  loggedIn() {
    var token = this.token
    return token != null && !this.helper.isTokenExpired(token);
  }

  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getCurrentUserId() {
    if (this.token) {
      return this.helper.decodeToken(this.token).nameid;
    }
    else {
      return -1;
    }
  }

}
