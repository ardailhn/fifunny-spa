import { Component, OnInit } from '@angular/core';
import { DefaultUser } from '../models/defaultUser';
import { ReservationForList } from '../models/reservationForList';
import { DefaultUserAuthService } from '../services/default-user-auth.service';
import { PlaceService } from '../services/place.service';
import { PublicService } from '../services/public.service';

@Component({
  selector: 'app-profileDefaultUser',
  templateUrl: './profileDefaultUser.component.html',
  styleUrls: ['./profileDefaultUser.component.css']
})
export class ProfileDefaultUserComponent implements OnInit {

  constructor(private authService:DefaultUserAuthService,private publicService: PublicService,private placeService:PlaceService) { }

  user!:DefaultUser;
  userId!:number;

  reservationsT: ReservationForList[] = [];
  reservationsF: ReservationForList[] = [];

  ngOnInit() {
    this.userId = this.authService.getCurrentUserId();
    this.getUser();
    this.getReservationT();
    this.getReservationF();
  }

  getUser(){
    this.publicService.getDefaultUserById(this.userId).subscribe(data => {
      this.user = data;
    })
  }

  getReservationT(){
    this.placeService.getReservationsByDefaultUserIdVerified(this.userId).subscribe(data => {
      this.reservationsT = data;
    })
  }

  getReservationF(){
    this.placeService.getReservationsByDefaultUserId(this.userId).subscribe(data => {
      this.reservationsF = data;
    })
  }

  deleteReservation(r:ReservationForList){
    this.placeService.deleteReservation(r);
  }

}
