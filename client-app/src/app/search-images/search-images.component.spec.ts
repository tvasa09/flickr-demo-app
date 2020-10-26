import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FlickrService } from '../services/flickr.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

import { SearchImagesComponent } from './search-images.component';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('SearchImagesComponent', () => {
  let component: SearchImagesComponent;
  let fixture: ComponentFixture<SearchImagesComponent>;
  let flickrService: FlickrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchImagesComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [FlickrService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchImagesComponent);
    component = fixture.componentInstance;
    flickrService = fixture.debugElement.injector.get(FlickrService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get results of all feeds', fakeAsync(() =>{
    component.images = [];
    spyOn(flickrService,'getAllFeeds').and.callFake(() => {
      return of({items: 'data'});
    });
    component.callFeeds();
    expect(component.images).not.toBeNull();
  }));

  it('should get results of searched keywords image feeds', fakeAsync(() =>{
    component.searchedImages = [];
    const event = { target: { value: 'flower' }};
    spyOn(flickrService,'search_keyword').and.callFake(() => {
      return of([{url: 'url'}]);
    });
    component.searchImage(event);
    expect(component.searchedImages).not.toBeNull();
  }));

  it('should get results of searched keywords image feeds when keyword is empty', fakeAsync(() =>{
    component.searchedImages = [];
    const event = { target: { value: '' }};
    spyOn(flickrService,'search_keyword').and.callFake(() => {
      return of([{url: 'url'}]);
    });
    component.searchImage(event);
    expect(component.searchedImages.length).toEqual(0);
  }));

});
