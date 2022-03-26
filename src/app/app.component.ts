import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from './models/category';
import { PlaceService } from './services/place.service';
import { ResponsiveService } from './services/responsive.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fifunny-spa';
  constructor(private responsiveService:ResponsiveService){
  }
  ngOnInit(){
  }

  onResize(event){
  }
}
