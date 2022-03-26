import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { About } from '../models/about';
import { Cinsiyet } from '../models/cinsiyet';
import { DefaultUser } from '../models/defaultUser';
import { MainPlace } from '../models/MainPlace';
import { Message } from '../models/message';
import { Place } from '../models/place';
import { User } from '../models/user';
import { AlertifyService } from './alertify.service';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  path!: string;

  constructor(
    private httpClient: HttpClient,
    private alertifyService: AlertifyService,
    private globalService: GlobalService,
  ) {
    this.path = globalService.API_PATH;
  }

  sendMessage(text: String) {
    this.httpClient.post(this.path + '/admin/message', text).subscribe((data) => {
      this.alertifyService.success('Mesajınız Gönderildi.');
    });
  }

  getMessage() {
    return this.httpClient.get<Message[]>(this.path + '/admin/notificaitons');
  }

  deleteMessage(message: Message) {
    return this.httpClient.post(this.path + '/admin/notificaitons/delete', message).subscribe(data => {
      this.alertifyService.success('Mesaj silindi.');
    })
  }

  getUserById(id: number) {
    return this.httpClient.get<User>(this.path + "user/user/?id=" + id);
  }

  getDefaultUserById(id: number) {
    return this.httpClient.get<DefaultUser>(this.path + "DefaultUsers/user/?id=" + id);
  }

  getPlacesByUserId(id: number) {
    return this.httpClient.get<Place[]>(this.path + "user/places/?id=" + id)
  }

  getCinsiyet(): Observable<Cinsiyet[]> {
    return this.httpClient.get<Cinsiyet[]>(this.path + 'address/cinsiyet');
  }

  getAbout(): Observable<About> {
    return this.httpClient.get<About>(this.path + 'address/about');
  }

  updateAbout(about: About) {
    this.httpClient.put(this.path + "address/about/update", about).subscribe(data => {
      this.alertifyService.success("Güncelleme Başarılı");
    }, err => {
      this.alertifyService.error("Hata!")
    })
  }

  getMainPlaceId(): Observable<any> {
    return this.httpClient.get<any>(this.path + 'address/MainPlace');
  }

  updateMainPlace(mainPlace: MainPlace) {
    this.httpClient.put(this.path + "address/mainplace/update", mainPlace).subscribe(data => {
      this.alertifyService.success("Güncellendi");
    }, err => {
      this.alertifyService.error("Hata!")
    })
  }

}
