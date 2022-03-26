import { Component, OnInit } from '@angular/core';
import { Place } from '../models/place';
import { ReservationForList } from '../models/reservationForList';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { PlaceService } from '../services/place.service';
import { PublicService } from '../services/public.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private authService:AuthService,private publicService: PublicService,private placeService:PlaceService) { }

  user!:User;
  userId!:number;

  places: Place[] = [];

  reservationsT: ReservationForList[] = [];
  reservationsF: ReservationForList[] = [];

  ngOnInit() {
    this.userId = this.authService.getCurrentUserId();
    this.getUser();
    this.getPlacesByUserId()
    this.getReservationsT();
    this.getReservationsF();
  }

  getUser(){
    this.publicService.getUserById(this.userId).subscribe(data => {
      this.user = data;
    })
  }

  getPlacesByUserId(){
    this.publicService.getPlacesByUserId(this.userId).subscribe(data => {
      this.places = data
    })
  }

  deletePlace(place){
    this.placeService.deletePlace(place);
    window.location.reload();
  }

  getReservationsT(){
    this.placeService.getReservationsByUserIdVerified(this.userId).subscribe(data => {
      this.reservationsT = data;
    })
  }

  getReservationsF(){
    this.placeService.getReservationsByUserId(this.userId).subscribe(data => {
      this.reservationsF = data;
    })
  }

  test(r:ReservationForList){
    //console.log(r.sday)
  }

  verifyReservation(r:ReservationForList){
    this.placeService.reservationVerified(r);
  }

  deleteReservation(r:ReservationForList){
    this.placeService.deleteReservation(r);
  }

}