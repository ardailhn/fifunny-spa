/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlaceRoleService } from './place-role.service';

describe('Service: PlaceRole', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlaceRoleService]
    });
  });

  it('should ...', inject([PlaceRoleService], (service: PlaceRoleService) => {
    expect(service).toBeTruthy();
  }));
});
