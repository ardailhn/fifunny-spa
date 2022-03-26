import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { AlertifyService } from './alertify.service';
import { Admin } from '../models/admin';
import { AdminPlace } from '../models/adminPlace';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {

  path!: string;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private alertifyService: AlertifyService,
    private globalService: GlobalService,
  ) {
    this.path = globalService.API_PATH + "admin/" ;
  }

  userToken: any;
  decodedToken: any;
  helper = new JwtHelperService();
  TOKEN_KEY = "id_token_id";

  login(admin: Admin) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    this.httpClient
      .post(this.path + 'login', admin, { headers: headers })
      .subscribe((data) => {
        const token = (<any>data).token;
        this.saveToken(token);
        this.userToken = token;
        this.alertifyService.success("Giriş başarılı");
        this.router.navigateByUrl('/admin-panel');
      }, err => {
        this.alertifyService.error("Kullanıcı adı yada şifre bilgileri hatalı!")
      });
  }

  register(admin: Admin) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.httpClient
      .post(this.path + 'register', admin, { headers: headers })
      .subscribe((data) => {
        this.alertifyService.success("Kayıt başarılı");
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
    const token = this.token
    if (token) {
      return this.helper.decodeToken(token).nameid;
    }
    else {
      return -1;
    }
  }

  getPlaces(): Observable<AdminPlace[]> {
    return this.httpClient.get<AdminPlace[]>(this.path + 'places');
  }

  getPlacesList(): Observable<AdminPlace[]> {
    return this.httpClient.get<AdminPlace[]>(this.path + 'places/list');
  }

}
