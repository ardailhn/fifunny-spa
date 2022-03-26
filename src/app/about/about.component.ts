import { Component, OnInit } from '@angular/core';
import { About } from '../models/about';
import { PublicService } from '../services/public.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private publicService:PublicService) { }

  itemImageUrl = "./assets/img/ofis.jpg"

  about!:About

  ngOnInit() {
    this.getAbout();
  }

  getAbout(){
    this.publicService.getAbout().subscribe(data => {
      this.about = data;
    })
  }

}
