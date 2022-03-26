import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUser } from '../models/loginUser';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { AlertifyService } from './alertify.service';
import { RegisterUser } from '../models/registerUser';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  path!: string;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private alertifyService: AlertifyService,
    private globalService: GlobalService,
  ) {
    this.path = globalService.API_PATH + "auth/" ;
  }

  userToken: any;
  decodedToken: any;
  helper = new JwtHelperService();
  TOKEN_KEY = "id_token";

  login(loginUser: LoginUser) {
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

  register(registerUser: RegisterUser) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.httpClient
      .post(this.path + 'register', registerUser, { headers: headers })
      .subscribe((data) => {
        this.alertifyService.success("Kayıt başarılı");
        this.router.navigateByUrl('/loginUser');
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
    const token = this.token
    return token != null && !this.helper.isTokenExpired(token);
  }

  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getCurrentUserId() {
    const token = this.token
    if (token) {
      return this.helper.decodeToken(token).nameid;
    }
    else {
      return -1;
    }
  }

}
