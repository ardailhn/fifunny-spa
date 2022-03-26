import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AdminService } from './admin.service';
@Injectable({
  providedIn: 'root' // just before your class
})
export class AdminAuthGuardService implements CanActivate {
  constructor(public auth: AdminService, public router: Router) {}
  canActivate(): boolean {
    if (!this.auth.loggedIn()) {
      this.router.navigateByUrl("/admin-login");
      return false;
    }
    return true;
  }
}