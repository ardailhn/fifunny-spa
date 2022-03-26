import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Place } from '../models/place';
import { Photo } from '../models/photo';
import { Province } from '../models/province';
import { District } from '../models/district';
import { Category } from '../models/category';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Router } from '@angular/router';
import { GlobalService } from './global.service';
import { Filter } from '../models/filter';
import { Comment } from '../models/comment';
import { Reservation } from '../models/reservation';
import { ReservationForList } from '../models/reservationForList';

@Injectable({
  providedIn: 'root',
})
export class PlaceService {

  path!: string;

  constructor(
    private httpClient: HttpClient,
    private alertifyService: AlertifyService,
    private router: Router,
    private globalService: GlobalService,
  ) {
    this.path = globalService.API_PATH;
  }

  getPlaces(): Observable<Place[]> {
    return this.httpClient.get<Place[]>(this.path + 'places');
  }

  getPlacesById(id: number): Observable<Place> {
    return this.httpClient.get<Place>(this.path + 'places/detail/?id=' + id);
  }

  getPhotosByPlace(id: number): Observable<Photo[]> {
    return this.httpClient.get<Photo[]>(this.path + 'places/photos/?id=' + id);
  }

  add(place: Place) {
    this.httpClient.post(this.path + '/places/add', place).subscribe((data) => {
      this.router.navigateByUrl('/place-filter/' + data["id"]);
      this.alertifyService.success('Kayıt işlemi başarıyla tamamlandı.');
    });
  }

  getProvinces(): Observable<Province[]> {
    return this.httpClient.get<Province[]>(this.path + 'address');
  }

  getDistrictsByProvinceId(id: number): Observable<District[]> {
    return this.httpClient.get<District[]>(this.path + 'address/' + id);
  }

  getDistrictsById(id: number): Observable<District> {
    return this.httpClient.get<District>(this.path + 'address/district/' + id);
  }

  getProvinceById(id: number): Observable<Province> {
    return this.httpClient.get<Province>(this.path + 'address/province/' + id);
  }

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.path + 'address/categories');
  }

  getPlacesByCategoryId(id: number): Observable<Place[]> {
    return this.httpClient.get<Place[]>(this.path + 'places/?categoryId=' + id);
  }

  deletePlace(place) {
    this.httpClient.post(this.path + "places/delete", place).subscribe(data => {
      window.location.reload();
      this.alertifyService.success("Başarıyla silindi.")
    })
  }

  updatePlace(id: number) {
    this.httpClient.get(this.path + "places/verified/?id=" + id).subscribe(data => {
      this.alertifyService.success("İşletme Onaylandı");
    }, err => {
      this.alertifyService.error("Hata!")
    })
  }

  updatePlaceSettings(place: Place) {
    this.httpClient.put(this.path + "places/update", place).subscribe(data => {
      this.alertifyService.success("Güncelleme Başarılı");
    }, err => {
      this.alertifyService.error("Hata!!");
    })
  }

  addFilter(filter: Filter) {
    this.httpClient.post(this.path + 'places/addFilter/?id=' + filter.placeId, filter).subscribe((data) => {
      this.alertifyService.success('Filtreler başarıyla kaydedildi.');
      this.router.navigateByUrl('/place-custom/' + filter.placeId);
    });
  }

  getCommentsByPlaceId(id:number): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(this.path + 'places/getComments/?id=' + id);
  }

  addComment(comment: Comment) {
    this.httpClient.post(this.path + 'places/addComment/?id=' + comment.placeId , comment).subscribe((data) => {
      this.alertifyService.success('Yorum başarıyla gönderildi. Onay Bekleniyor.');
    });
  }

  deleteComment(id:number){
    this.httpClient.get(this.path + "places/deleteComment/?id=" + id).subscribe(data => {
      window.location.reload();
      this.alertifyService.success("Başarıyla silindi.")
    })
  }

  getCommentsAdmin(): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(this.path + 'places/getCommentsAdmin');
  }

  verifyComment(id:number){
    return this.httpClient.get(this.path + 'places/updateComment/?id=' + id).subscribe(data => {
      this.alertifyService.success("İşletme Onaylandı");
      window.location.reload();
    }, err => {
      this.alertifyService.error("Hata!")
    })
  }

  addReservation(reservation: Reservation) {
    this.httpClient.post(this.path + 'places/addReservation', reservation).subscribe((data) => {
      this.alertifyService.success('Rezervasyon başarıyla gönderildi. Onay Bekleniyor.');
    });
  }

  getReservationsByUserId(id:number): Observable<ReservationForList[]> {
    return this.httpClient.get<ReservationForList[]>(this.path + 'places/getReservationsUser/false/?id=' + id);
  }

  getReservationsByDefaultUserId(id:number): Observable<ReservationForList[]> {
    return this.httpClient.get<ReservationForList[]>(this.path + 'places/getReservationsDefaultUser/false/?id=' + id);
  }

  getReservationsByUserIdVerified(id:number): Observable<ReservationForList[]> {
    return this.httpClient.get<ReservationForList[]>(this.path + 'places/getReservationsUser/true/?id=' + id);
  }

  getReservationsByDefaultUserIdVerified(id:number): Observable<ReservationForList[]> {
    return this.httpClient.get<ReservationForList[]>(this.path + 'places/getReservationsDefaultUser/true/?id=' + id);
  }
  
  reservationVerified(reservation: ReservationForList) {
    this.httpClient.post<Reservation>(this.path + "places/reservationVerified",reservation).subscribe(data => {
      window.location.reload();
      this.alertifyService.success("Rezervasyon Onaylandı");
    }, err => {
      this.alertifyService.error("Hata!")
    })
  }

  deleteReservation(reservation: ReservationForList) {
    this.httpClient.post(this.path + "places/deleteReservation", reservation).subscribe(data => {
      window.location.reload();
      this.alertifyService.success("Başarıyla silindi.")
    })
  }

}
