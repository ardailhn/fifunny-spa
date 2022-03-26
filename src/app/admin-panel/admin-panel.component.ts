import { Component, OnInit } from '@angular/core';
import { AdminPlace } from '../models/adminPlace';
import { MainPlace } from '../models/MainPlace';
import { Message } from '../models/message';
import { AdminService } from '../services/admin.service';
import { PlaceService } from '../services/place.service';
import { PublicService } from '../services/public.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor(private publicService:PublicService,private adminService:AdminService,private placeService:PlaceService) { }

  message: Message[] = [];
  places: AdminPlace[] = [];
  placesList: AdminPlace[] = [];
  mainPlace!: MainPlace;

  ngOnInit() {
    this.getMessage();
    this.getPlaces();
    this.getPlacesList();
  }

  getMessage(){
    this.publicService.getMessage().subscribe(data => {
      this.message = data
    })
  }

  getPlaces(){
    this.adminService.getPlaces().subscribe(data => {
      this.places = data
    })
  }

  getPlacesList(){
    this.adminService.getPlacesList().subscribe(data => {
      this.placesList = data
    })
  }

  deleteMessage(message:Message){
    this.publicService.deleteMessage(message);
    window.location.reload();
  }

  onaylaPlace(place:AdminPlace){
    this.placeService.updatePlace(place.id);
    window.location.reload();
  }

  deletePlace(place){
    this.placeService.deletePlace(place);
  }

  updateMainPlace(id:number){
    const source =  {id:1,placeId:id}
    this.mainPlace = Object.assign({},source);
    this.publicService.updateMainPlace(this.mainPlace);
  }

}
