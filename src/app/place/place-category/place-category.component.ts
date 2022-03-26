import { Component, OnInit, Input, ElementRef, Inject, Directive } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Filter } from 'src/app/models/filter';
import { Photo } from 'src/app/models/photo';
import { Place } from 'src/app/models/place';
import { PlaceService } from 'src/app/services/place.service';
import { PublicService } from 'src/app/services/public.service';

@Component({
  selector: 'app-place-category',
  templateUrl: './place-category.component.html',
  styleUrls: ['./place-category.component.css'],
})
export class PlaceCategoryComponent implements OnInit {
  @Inject('filterTitle') focusField!: ElementRef;
  @Inject('menuTitle') focusField1!: ElementRef;
  constructor(
    private formBuilder: FormBuilder,
    private placeServices: PlaceService,
    private activatedRoute: ActivatedRoute,
    private publicService: PublicService,
    private router: Router,
    private placeService: PlaceService,
  ) { }
  places!: Place[];
  category: Category[] = [];
  place!: Place;
  photos: Photo[] = [];
  isOpened: boolean = false;
  filterText!: string;
  mekanId!: number;
  filterForm!: FormGroup;
  filter!: Filter;
  categoryId!: number;
  itemImageUrl = '/assets/img/deneme1.jpg';
  opened!: boolean;
  panelOpenState = false;
  opened1!: boolean;

  ngOnInit() {
    this.getParamsText();
    this.getParamsId();
    this.getPlacesByCategoryId(this.categoryId);
    this.getCategories();
    this.createPlaceFrom();
  }

  openedDrawer(id:number){
    var x = document.getElementById("container");
    if(id){
      x?.classList.toggle("containerO");
    }else{
      x?.classList.remove("containerO")
    }
  }

  getFocus(){
    this.focusField.nativeElement.focus();
  }
  getFocus1(){
    this.focusField1.nativeElement.focus();
  }

  getParamsText() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.filterText = params['text'];
    });
  }

  getParamsId() {
    this.activatedRoute.params.subscribe((params) => {
      this.categoryId = parseInt(params['id']) + 1;
    });
  }

  getCategories() {
    this.placeServices.getCategories().subscribe((data) => {
      this.category = data;
    });
  }

  getPlacesByCategoryId(id: number) {
    this.places = [];
    this.placeServices.getPlacesByCategoryId(id).subscribe((data) => {
      this.places = data;
    });
  }

  getPlaces() {
    this.placeServices.getPlaces().subscribe((data) => {
      this.places = data;
    });
  }

  active!: number;
  onClick(index: number) {
    this.active = index + 1;
    //console.log(index + '-' + this.active);
    if (index === -1) {
      this.getPlaces();
    } else {
      this.router.navigateByUrl('/place-category/' + (index));
      this.getPlacesByCategoryId(index + 1);
      this.resetFilter()
    }
  }

  getFilter() {
    if (this.filterForm.valid) {
      this.filter = Object.assign({}, this.filterForm.value);
      this.getNull(this.filter);
    }
  }

  getNull(obj: Filter) {
    Object.keys(obj).forEach((key) =>
      obj[key] == false &&
        key != 'alkol' &&
        key != 'nargile' &&
        key != 'masaOyunu' &&
        key != 'cocukUygun' &&
        key != 'cocukOyunAlani'
        ? (obj[key] = null)
        : true
    );
  }

  resetFilter() {
    this.filter = null as any;
    this.filterForm.reset()
    this.getFilter()
  }

  createPlaceFrom() {
    this.filterForm = this.formBuilder.group({
      alkol: [null],
      nargile: [null],
      masaOyunu: [null],
      cocukUygun: [null],
      cocukOyunAlani: [null],

      fekonomik: [null],
      fstandart: [null],
      flux: [null],

      ysakin: [null],
      ystandart: [null],
      ykalabalik: [null],

      utoplanti: [null],
      udans: [null],
      usohbet: [null],
      uders: [null],
      uyemek: [null],
      utatli: [null],
      ukahvalti: [null],

      sself: [null],
      sgarson: [null],
      stake: [null],

      mrap: [null],
      mrock: [null],
      mpop: [null],
      mhiphop: [null],
      mklasik: [null],
      mnostaji: [null],
      myerli: [null],
      myabanci: [null],

      tmodern: [null],
      tvintage: [null],
      tsalas: [null],
      totantik: [null],
      tbutik: [null],
      tkitap: [null],

      mmasa: [null],
      mbistro: [null],
      mayakta: [null],
      mloca: [null],
    });
  }

  Ekonomik!: boolean;

}
