import { TestBed, inject } from '@angular/core/testing';

import { GetFilmsService } from './get-films.service';

describe('GetFilmsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetFilmsService]
    });
  });

  it('should be created', inject([GetFilmsService], (service: GetFilmsService) => {
    expect(service).toBeTruthy();
  }));

  it('should be created', inject([GetFilmsService], (service: GetFilmsService) => {
    expect(service).toBeTruthy();
  }));

});
