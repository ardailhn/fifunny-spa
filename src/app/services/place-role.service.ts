import { Injectable } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import {
  Router,
  CanActivate,
  ActivatedRoute,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Place } from '../models/place';
import { AuthService } from './auth.service';
import { PlaceService } from './place.service';
import { Observable } from 'rxjs';
import { AdminService } from './admin.service';
@Injectable({
  providedIn: 'root', // just before your class
})
export class PlaceRoleService implements CanActivate {
  currentPlace!: number;
  placeUserId!: number;
  userId!: number;
  adminId!: number;
  constructor(
    public auth: AuthService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private placeService: PlaceService,
    private adminAuth: AdminService
  ) {
    this.userId = this.auth.getCurrentUserId();
    console.log(this.userId);
    this.adminId = this.adminAuth.getCurrentUserId();
    console.log("this.adminId");
  }

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    var currentPlace1 = route.paramMap.get('id') as string;
    console.log(0);
    if (!this.auth.loggedIn()) {
      if (!this.adminAuth.loggedIn()) {
        this.router.navigateByUrl('/place');
        return false;
      }
    }
    console.log(1);
    if (this.auth.loggedIn()) {
      return await this.getReturn(+currentPlace1).then((res) => {
        console.log("->" + res)
        return res;
      });
    }
    if (this.adminAuth.loggedIn()) {
      return await this.getReturn1(+currentPlace1).then((res) => {
        return res;
      });
    }
    return false;
  }

  async getReturn1(id: number): Promise<boolean> {
    var response = await this.placeService.getPlacesById(id).toPromise();
    if (response) {
      this.placeUserId = Object.assign({}, response).userId;
      if (this.placeUserId == this.adminId) {
        return true;
      }
    }
    return false;
  }

  async getReturn(id: number): Promise<boolean> {
    var response = await this.placeService.getPlacesById(id).toPromise();
    if (response) {
      this.placeUserId = Object.assign({}, response).userId;
      if (this.placeUserId == this.userId) {
        return true;
      }
    }
    return false;
  }
}
