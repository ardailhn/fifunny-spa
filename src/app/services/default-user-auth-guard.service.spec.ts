/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DefaultUserAuthGuardService } from './default-user-auth-guard.service';

describe('Service: DefaultUserAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DefaultUserAuthGuardService]
    });
  });

  it('should ...', inject([DefaultUserAuthGuardService], (service: DefaultUserAuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
