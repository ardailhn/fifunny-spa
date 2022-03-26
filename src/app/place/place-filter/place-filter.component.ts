import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Filter } from 'src/app/models/filter';
import { Place } from 'src/app/models/place';
import { PlaceService } from 'src/app/services/place.service';

@Component({
  selector: 'app-place-filter',
  templateUrl: './place-filter.component.html',
  styleUrls: ['./place-filter.component.css']
})
export class PlaceFilterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private placeService: PlaceService,private activatedRoute:ActivatedRoute) { }

  placeId!:number;
  place!: Place;
  currentPlace!:Place;
  placeAddForm!: FormGroup;

  filter!:Filter;

  createPlaceFrom() {
    this.placeAddForm = this.formBuilder.group({
      alkol: [false],
      nargile: [false],
      masaOyunu: [false],
      cocukUygun: [false],
      cocukOyunAlani: [false],

      fekonomik: [false],
      fstandart: [false],
      flux: [false],

      ysakin: [false],
      ystandart: [false],
      ykalabalik: [false],

      utoplanti: [false],
      udans: [false],
      usohbet: [false],
      uders: [false],
      uyemek: [false],
      utatli: [false],
      ukahvalti: [false],

      sself: [false],
      sgarson: [false],
      stake: [false],

      mrap: [false],
      mrock: [false],
      mpop: [false],
      mhiphop: [false],
      mklasik: [false],
      mnostaji: [false],
      myerli: [false],
      myabanci: [false],

      tmodern: [false],
      tvintage: [false],
      tsalas: [false],
      totantik: [false],
      tbutik: [false],
      tkitap: [false],

      mmasa: [false],
      mbistro: [false],
      mayakta: [false],
      mloca: [false],

    });
  }

  ngOnInit() {
    this.getParams();
    this.createPlaceFrom();
  }

  update(){
    if (this.placeAddForm.valid) {
      this.filter = Object.assign({}, this.placeAddForm.value);
      //console.log(this.filter)
      this.filter.placeId = this.currentPlace.id;
      this.placeService.addFilter(this.filter);
    }
  }

  getPlaceById(id:number){
    if(id!=undefined){
      this.placeService.getPlacesById(id).subscribe(data => {
        this.currentPlace = data;
      })
    }
  }

  getParams() {
    this.activatedRoute.params.subscribe(params => {
      this.getPlaceById(params["id"])
    })
  }

}