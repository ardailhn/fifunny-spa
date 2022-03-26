import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Category } from '../models/category';
import { Photo } from '../models/photo';
import { Place } from '../models/place';
import { PlaceService } from '../services/place.service';
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation,
  NgxGalleryAction,
} from '@kolkov/ngx-gallery';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { PublicService } from '../services/public.service';
import { MainPlace } from '../models/MainPlace';
import { Filter } from '../models/filter';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ResponsiveService } from '../services/responsive.service';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css'],
  providers: [PlaceService],
})
export class PlaceComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private placeServices: PlaceService,
    private placeService: PlaceService,
    private activatedRoute: ActivatedRoute,
    private publicService: PublicService,
    private router:Router,
    private responsiveService: ResponsiveService,
  ) { 
    this.filteredStates = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map(state => (state ? this._filterStates(state) : this.places.slice())),
    );
  }
  places!: Place[];
  category: Category[] = [];
  place!: Place;
  photos: Photo[] = [];
  galleryOptions!: NgxGalleryOptions[];
  galleryImages!: NgxGalleryImage[];
  galleryAction!: NgxGalleryAction[];
  isOpened: boolean = false;
  kapakUrl = '/assets/img/kapak.jpg';
  filterText!: string;
  mainPlace!: MainPlace;
  mekanId!: number;
  filterForm!: FormGroup;
  filter!: Filter;
  isMobile!: Boolean;

  stateCtrl = new FormControl();
  filteredStates!: Observable<Place[]>;

  opened!: boolean;

  private _filterStates(value: string): Place[] {
    const filterValue = value.toLowerCase();
    return this.places.filter(state => state.name.toLowerCase().includes(filterValue));
  }

  ngOnInit() {
    this.proceed();
    this.getParams();
    this.getPlaces();
    this.getCategories();
    this.createPlaceFrom();
    this.onResize();
    this.responsiveService.checkWidth();
  }

  openedDrawer(id:number){
    var x = document.getElementById("container");
    if(id){
      x?.classList.toggle("containerO");
    }else{
      x?.classList.remove("containerO")
    }
  }

  getImgUrl(){
    const imageUrls = [] as any;
    for (let i = 0; i < this.place.photos.length; i++) {
      imageUrls.push(this.place.photos[i].url);
      console.log(this.place.photos[i].url)
    }
    imageUrls.push('assets/img/kapak/fiKapak1.png')
    //imageUrls.push('assets/img/kapak/fiKapak2.png')
    imageUrls.push('assets/img/kapak/fiKapak3.png')
    imageUrls.push(this.kapakUrl);
    this.images = imageUrls;
  }

  onResize() {
    this.responsiveService.getMobileStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

  async proceed() {
    await this.getMainPlaceId();
  }

  async getMainPlaceId() {
    var response = await this.publicService.getMainPlaceId().toPromise();
    if (response) {
      this.mainPlace = Object.assign({}, response);
      this.getPlaceById(this.mainPlace.placeId);
    }
  }

  getParams() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.filterText = params['text'];
    });
  }

  getImages() {
    const imageUrls = [] as any;
    for (let i = 0; i < this.place.photos.length; i++) {
      imageUrls.push({
        small: this.place.photos[i].url,
        medium: this.place.photos[i].url,
        big: this.place.photos[i].url,
      });
    }
    imageUrls.push({
      small: this.kapakUrl,
      medium: this.kapakUrl,
      big: this.kapakUrl,
    });
    return imageUrls;
  }

  setGallery() {
    this.galleryOptions = [
      {
        imageAutoPlay: true,
        thumbnails: false,
        imageArrowsAutoHide: true,
        thumbnailsArrowsAutoHide: true,
        width: '100%',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Fade,
        imageDescription: true,
        preview: false,
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20,
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false,
      },
    ];
    this.actionButtonClicked = this.actionButtonClicked.bind(this);
    this.galleryAction = [
      { icon: 'TestData', onClick: this.actionButtonClicked },
    ];
    this.galleryImages = this.getImages();
  }

  actionButtonClicked() {
    //console.log('test');
  }

  getPlaceById(id: number) {
    this.placeService.getPlacesById(id).subscribe((data) => {
      this.place = data;
      this.getPhotosById(id);
    });
  }

  getPhotosById(id: number) {
    this.placeService.getPhotosByPlace(id).subscribe((data) => {
      this.photos = data;
      this.getImgUrl();
    });
  }

  getCategories() {
    this.placeServices.getCategories().subscribe((data) => {
      this.category = data;
    });
  }

  getPlaces() {
    this.placeServices.getPlaces().subscribe((data) => {
      this.places = data;
    });
  }

  getPlacesByCategoryId(id: number) {
    this.places = [];
    this.placeServices.getPlacesByCategoryId(id).subscribe((data) => {
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
      //this.getPlacesByCategoryId(index + 1);
      this.router.navigateByUrl('/place-category/' + (index));
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
    window.location.reload();
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

  images = [];

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  @ViewChild('carousel', {static : true}) carousel!: NgbCarousel;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }

}
