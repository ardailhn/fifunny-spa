import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Photo } from 'src/app/models/photo';
import { PlaceService } from 'src/app/services/place.service';
import { Place } from 'src/app/models/place';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-place-custom',
  templateUrl: './place-custom.component.html',
  styleUrls: ['./place-custom.component.css'],
})
export class PlaceCustomComponent implements OnInit {
  constructor(
    public router: Router,
    private authService: AuthService,
    private alertifyService: AlertifyService,
    private activatedRoute: ActivatedRoute,
    private placeService: PlaceService,
    private globalService: GlobalService
  ) { }

  photos: Photo[] = [];
  hasBaseDropZoneOver = false;
  baseUrl!: string;
  currentMain!: Photo;
  currentCity!: number;
  uploader!: FileUploader;
  hasAnotherDropZoneOver!: boolean;
  response!: string;
  place!: Place;

  ngOnInit() {
    this.baseUrl = this.globalService.API_PATH;
    this.activatedRoute.params.subscribe((params) => {
      this.currentCity = params['id'];
    });
    this.getPlaceById(this.currentCity);
    this.initializeUploader();
  }

  getPlaceById(id: number) {
    this.placeService.getPlacesById(id).subscribe((data) => {
      this.place = data;
    });
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'places/' + this.currentCity + '/photos',
      authToken: 'token ' + localStorage.getItem('id_token'),
      isHTML5: true,
      allowedFileType: ['image'],
      autoUpload: false,
      removeAfterUpload: true,
      maxFileSize: 10 * 1024 * 1024,
    });

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          isMain: res.isMain,
          placeId: res.placeId,
        };
        this.photos.push(photo);
      }
    };
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }


  //TODO
  // user == place.userId

  async proceed() {
    await this.getMainPlaceId()
  }

  async getMainPlaceId() {
    // var response = await this.publicService.getMainPlaceId().toPromise();
    // if (response) {
    //     this.mainPlace = Object.assign({},response);
    //   this.getPlaceById(this.mainPlace.placeId)
    // }
  }

}
