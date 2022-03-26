import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DefaultUserAuthService } from './default-user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class DefaultUserAuthGuardService {
  constructor(public auth: DefaultUserAuthService, public router: Router) {}
  canActivate(): boolean {
    if (!this.auth.loggedIn()) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}
