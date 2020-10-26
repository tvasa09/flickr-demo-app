import {Component,OnInit} from '@angular/core';
import {FlickrService} from '../services/flickr.service';

/**
 * Thiscomponent isused to view images and searched images of app
 */
@Component({
  selector: 'app-search-images',
  templateUrl: './search-images.component.html',
  styleUrls: ['./search-images.component.scss']
})
export class SearchImagesComponent implements OnInit {
  images = [];
  searchedImages = [];
  keyword: string;

  /**
   * 
   * [flickrService] {@link FlickrService} for getting images
   */
  constructor(private flickrService: FlickrService) {}

  /**
   * Initiaize page load
   */
  ngOnInit() {
    this.callFeeds();
  }

  /**
   * This method is used to search image by keyword
   */
  public searchImage(event: any) {
    this.keyword = event.target.value.toLowerCase();
    if (this.keyword && this.keyword.length > 0) {
      this.images = [];
      this.flickrService.search_keyword(this.keyword)
        .toPromise()
        .then(res => {
          this.searchedImages = res;
        });
    } else {
      this.callFeeds();
    }
  }

  /**
   * This method is used to call all public feeds
   */
  public callFeeds() {
    this.searchedImages = [];
    this.flickrService.getAllFeeds()
      .toPromise()
      .then(res => {
        this.images = res.items;
      });
  }
}
