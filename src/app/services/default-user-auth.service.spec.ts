/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DefaultUserAuthService } from './default-user-auth.service';

describe('Service: DefaultUserAuth', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DefaultUserAuthService]
    });
  });

  it('should ...', inject([DefaultUserAuthService], (service: DefaultUserAuthService) => {
    expect(service).toBeTruthy();
  }));
});
