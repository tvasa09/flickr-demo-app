import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { FlickrService } from './flickr.service';

describe('FlickrService', () => {
  let service: FlickrService;
  let httpMock: HttpTestingController;
  let responseArr: Object = {"photos":{"photo":[
    {"id":"50519442646","owner":"184553861@N02","secret":"4bcaf37bab","server":"65535","farm":66,
    "title":"am clickz :- Neeta (Dhanveer) Travels AC Sleeper Bus.","ispublic":1,"isfriend":0,"isfamily":0}]}};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule, HttpClientTestingModule, RouterTestingModule],
      providers: [FlickrService, HttpClient]
    });
    service = TestBed.inject(FlickrService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(()=> {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all feeds', () => {
    service.getAllFeeds();
    httpMock.verify();
  });

  it('should get all feeds by searched keyword', () => {
    const urlArr = [];
    service.search_keyword('flower');
    httpMock.verify();
    expect(urlArr).not.toBeNull();
  });


});
