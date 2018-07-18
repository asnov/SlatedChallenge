import { TestBed, inject } from '@angular/core/testing';

import { GetFilmsService } from './get-films.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';


let httpClientSpy: {
  get: jasmine.Spy,
  jsonp: jasmine.Spy,
};

// TODO: use HttpClientTestingModule


describe('GetFilmsService', () => {

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'jsonp']);
    TestBed.configureTestingModule({
      providers: [GetFilmsService,
        {provide: HttpClient, useValue: httpClientSpy}]
    });
  });

  it('should be created', inject([GetFilmsService], (service: GetFilmsService) => {
    expect(service).toBeTruthy();
  }));

  it('should save film name', inject([GetFilmsService], (service: GetFilmsService) => {
    service.getFilmsByName('qwerty');
    console.log(service.name);
    expect(service.name).toEqual('qwerty');
  }));

  it('should initiate a new call to the API', inject([GetFilmsService], (service: GetFilmsService) => {
    service.getFilmsByName('qwerty');
    console.log(service.name);
    expect(service.name).toEqual('qwerty');

    expect(httpClientSpy.jsonp.calls.count()).toEqual(1);
    expect(httpClientSpy.jsonp.calls.mostRecent().args)
      .toEqual([`${environment.apiUrl}?term=qwerty`, 'callback']);
  }));

});
