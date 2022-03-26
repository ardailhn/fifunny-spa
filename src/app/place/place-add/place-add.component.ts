import { Component, OnInit } from '@angular/core';
import { PlaceService } from 'src/app/services/place.service';
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
import { AuthService } from 'src/app/services/auth.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-place-add',
  templateUrl: './place-add.component.html',
  styleUrls: ['./place-add.component.css'],
  providers: [PlaceService],
})
export class PlaceAddComponent implements OnInit {
  constructor(
    private placeService: PlaceService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private adminService: AdminService
  ) { }

  textareaConfig = { 'editable': true, 'spellcheck': true, 'height': 'auto','minHeight': '100px', }; // you can also set height 

  editor!: Editor;
  editor1!: Editor;
  html = '';

  place!: Place;
  placeAddForm!: FormGroup;
  Province: Province[] = [];
  District: District[] = [];
  selectedProvince!: number;
  sehir!: number;
  Category: Category[] = [];

  createPlaceFrom() {
    this.placeAddForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      uyarilar: ['', Validators.required],
      sehirId: ['', Validators.required],
      ilceId: ['', Validators.required],
      adres: ['', Validators.required],
      categoryId: ['', Validators.required],
      videoURL: [''],
      vergiNumarasi: [''],
    });
  }

  ngOnInit() {
    this.getProvinces();
    this.getCategories();
    this.createPlaceFrom();
    this.editor = new Editor();
    this.editor1 = new Editor();
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

  add() {
    if (this.placeAddForm.valid) {
      this.place = Object.assign({}, this.placeAddForm.value);
      if(this.authService.loggedIn()){
        this.place.userId = this.authService.getCurrentUserId();
      }else if(this.adminService.loggedIn()){
        this.place.userId = this.adminService.getCurrentUserId();
      }
      this.placeService.add(this.place);
    }
  }
}
