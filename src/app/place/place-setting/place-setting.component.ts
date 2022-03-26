import { Component, OnInit } from '@angular/core';
import { Editor } from 'ngx-editor';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Place } from 'src/app/models/place';
import { Province } from 'src/app/models/province';
import { District } from 'src/app/models/district';
import { Category } from 'src/app/models/category';
import { PlaceService } from 'src/app/services/place.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-place-setting',
  templateUrl: './place-setting.component.html',
  styleUrls: ['./place-setting.component.css']
})
export class PlaceSettingComponent implements OnInit {

  editor!: Editor;
  editor1!: Editor;
  html = '';

  constructor(private formBuilder: FormBuilder,private placeService: PlaceService,private activatedRoute:ActivatedRoute) { }

  placeId!:number;
  place!: Place;
  currentPlace!:Place;
  placeAddForm!: FormGroup;
  Province: Province[] = [];
  District: District[] = [];
  selectedProvince!: number;
  sehir!: number;
  Category: Category[] = [];

  createPlaceFrom() {
    this.placeAddForm = this.formBuilder.group({
      name: [''],
      description: [''],
      uyarilar: [''],
      sehirId: ['', Validators.required],
      ilceId: ['', Validators.required],
      adres: [''],
      categoryId: ['', Validators.required],
      videoURL: [''],
      vergiNumarasi: [''],
    });
  }

  ngOnInit() {
    this.getParams();
    this.getPlaceById(this.placeId);
    this.getProvinces();
    this.getCategories();
    this.createPlaceFrom();
    this.editor = new Editor();
    this.editor1 = new Editor();
  }

  update() {
    if (this.placeAddForm.valid) {
      this.place = Object.assign({}, this.placeAddForm.value);
      this.place.id = this.currentPlace.id
      this.placeService.updatePlaceSettings(this.place);
    }
  }

  getCategories() {
    this.placeService.getCategories().subscribe((data) => {
      this.Category = data;
    });
  }

  getProvinces() {
    this.placeService.getProvinces().subscribe((data) => {
      this.Province = data;
    });
  }

  onChangeProvince(id: number) {
    this.sehir = id;
    if (id) {
      this.placeService.getDistrictsByProvinceId(id).subscribe((data) => {
        this.District = data;
      });
    } else {
      this.District = [];
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
