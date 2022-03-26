import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Place } from 'src/app/models/place';
import { PlaceService } from 'src/app/services/place.service';
import { Photo } from 'src/app/models/photo';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import 'hammerjs';

import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation,
} from '@kolkov/ngx-gallery';
import { Province } from 'src/app/models/province';
import { District } from 'src/app/models/district';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Comment } from 'src/app/models/comment';
import { DefaultUserAuthService } from 'src/app/services/default-user-auth.service';
import { AdminService } from 'src/app/services/admin.service';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';
import { Reservation } from 'src/app/models/reservation';
import { Category } from 'src/app/models/category';

declare let alertify: any;

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.css'],
  providers: [PlaceService, { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
})
export class PlaceDetailComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private placeService: PlaceService,
    private formBuilder: FormBuilder,
    private auth: DefaultUserAuthService,
    private adminAuth: AdminService,
    private dUserAuth: DefaultUserAuthService,
    private router: Router,
  ) { }
  place!: Place;
  photos: Photo[] = [];
  galleryOptions!: NgxGalleryOptions[];
  galleryImages!: NgxGalleryImage[];
  videUrl!: string;

  comment!: Comment;
  commentForm!: FormGroup;
  currnetPlaceId!: number;
  comments: Comment[] = [];
  isAdmin!: boolean;

  dateRangeForm!: FormGroup;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  reservation!: Reservation;

  category: Category[] = [];

  instaUrl = "./assets/img/instagram.png";
  facebookUrl = "./assets/img/facebook.png";

  yorumlar = ["Hijyen bakımından yetersiz",
    "Hijyen bakımından olması gerektiği gibiydi ",
    "Çalışanlarla iletişim sorunu yaşadım",
    "Çalışanların iletişimi gayet iyiydi",
    "Lezzet bakımından beklentimi karşılamadı",
    "Lezzet bakımından başarılı buldum",
    "Ortamın ısısı mevsime göre idealdi",
    "Ortamın ısısı mevsime göre ideal durumda değildi",]

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.currnetPlaceId = params['id'];
      this.getPlaceById(params['id']);
    });
    this.createCommentForm();
    this.getComment();
    this.isAdmin = this.adminAuth.loggedIn();
    this.createDateRangeForm();
    this.getCategories();
  }

  active!: number;
  onClick(index: number) {
    this.active = index + 1;
    //console.log(index + '-' + this.active);
    if (index === -1) {
    } else {
      this.router.navigateByUrl('/place-category/' + (index));
    }
  }

  getCategories() {
    this.placeService.getCategories().subscribe((data) => {
      this.category = data;
    });
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
      this.setGallery();
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
        imageAnimation: NgxGalleryAnimation.Slide,
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

    this.galleryImages = this.getImages();
  }

  createCommentForm() {
    this.commentForm = this.formBuilder.group(
      {
        description: ["", Validators.required]
      },
    )
  }

  addComment() {
    if (this.commentForm.valid) {
      this.comment = Object.assign({}, this.commentForm.value)
      this.comment.placeId = this.currnetPlaceId;
      this.comment.userId = this.auth.getCurrentUserId();
      this.placeService.addComment(this.comment);
    }
  }

  getComment() {
    this.placeService.getCommentsByPlaceId(this.currnetPlaceId).subscribe(data => {
      this.comments = data;
    })
  }

  deleteComment(id: number) {
    if (this.isAdmin == true) {
      this.placeService.deleteComment(id);
    }
  }

  getConfirm() {
    if (this.dUserAuth.loggedIn()) {
      alertify.confirm('Gönder', this.commentForm.get('description')?.value, () => this.addComment()
        , function () { alertify.error('İptal') }).set('labels', { ok: 'Onayla', cancel: 'İptal!' });
    } else {
      alertify.error("Önce giriş yapmalısınız!")
    }
  }

  events: string[] = [];

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }

  createDateRangeForm() {
    this.dateRangeForm = this.formBuilder.group({
      start: new FormControl('', Validators.required),
      end: new FormControl('', Validators.required)
    });
  }

  verifyReservation() {
    if (this.dUserAuth.loggedIn()) {
      this.reservation = new Reservation;
      var sDate = moment(this.dateRangeForm.get("start")?.value);
      this.reservation.sDay = parseInt(sDate.format('DD'));
      this.reservation.sMonth = parseInt(sDate.format('MM'));
      this.reservation.sYear = parseInt(sDate.format('YYYY'));

      var eDate = moment(this.dateRangeForm.get("end")?.value);
      this.reservation.eDay = parseInt(eDate.format('DD'));
      this.reservation.eMonth = parseInt(eDate.format('MM'));
      this.reservation.eYear = parseInt(eDate.format('YYYY'));

      this.reservation.placeId = this.currnetPlaceId;
      this.reservation.userId = this.dUserAuth.getCurrentUserId();

      alertify.confirm('Rezervasyon',
        'rezervasyonunuz ' + this.reservation.sDay + "/" + this.reservation.sMonth + "/" + this.reservation.sYear +
        " ile " + this.reservation.eDay + "/" + this.reservation.eMonth + "/" + this.reservation.eYear + " tarhileri arasındadır."
        , () => this.addReservation()
        , function () { alertify.error('İptal') }).set('labels', { ok: 'Onayla', cancel: 'İptal!' });
    } else {
      alertify.error("Önce giriş yapmalısınız!")
    }
  }


  addReservation() {
    this.placeService.addReservation(this.reservation);
  }

  goLink() {
    if (this.place.videoURL) {
      window.open(this.place.videoURL, "_blank");
    } else {
      alertify.error("Bu işletmenin tanıtım videosu bulunmamaktadır")
    }
  }

  isBiletAl() {
    // 4 - 5 - 6 - 8 - 9 - 10 - 11 - 15
    if (this.place.categoryId == 4 || this.place.categoryId == 5 || this.place.categoryId == 6 || this.place.categoryId == 8 || this.place.categoryId == 9 || this.place.categoryId == 10 || this.place.categoryId == 11 || this.place.categoryId == 15) {
      return true;
    } else {
      return false;
    }
  }

  biletAl() {
    alertify
      .alert("Çok yakında sizlerle", function () {
      }).set('label', 'Tamam').set({ title: "Çok Yakında..." });
  }

  Gstars: number[] = [1, 2, 3, 4, 5];
  Hstars: number[] = [1, 2, 3, 4, 5];
  Bstars: number[] = [1, 2, 3, 4, 5];
  Mstars: number[] = [1, 2, 3, 4, 5];
  Tstars: number[] = [1, 2, 3, 4, 5];
  GselectedValue!: number;
  HselectedValue!: number;
  BselectedValue!: number;
  MselectedValue!: number;
  TselectedValue!: number;

  countStar(star) {
    this.GselectedValue = star;
  }

  countStar1(star) {
    this.HselectedValue = star;
  }

  countStar2(star) {
    this.BselectedValue = star;
  }

  countStar3(star) {
    this.MselectedValue = star;
  }

  countStar4(star) {
    this.TselectedValue = star;
  }

  goSocial(id: number) {
    if (id) {
      window.open("https://www.facebook.com/", "_blank");
    } else {
      window.open("https://www.instagram.com/", "_blank");
    }
  }

  yorum!: string;

  hazirYorum(y: string) {
    this.yorum = y;
  }

}