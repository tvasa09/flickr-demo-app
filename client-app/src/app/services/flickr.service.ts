import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {FlickrOutput,FlickrPhoto} from '../model/FlickrPhoto';

/**
 * FlickrService is used to get images from flickr api
 */
@Injectable({
  providedIn: 'root'
})
export class FlickrService {
  baseUrl: string = "http://127.0.0.1:3000/";

  /**
   * This constructor creates and initializes instance of FlickrService
   * 
   * @param http instance of 'HttpClient' used for performing HTTP requests.
   */
  constructor(private http: HttpClient) {}

  /**
   * This method is used to get searched images
   */
  search_keyword(keyword: string) {
    return this.http.get<any>(this.baseUrl + 'search/' + keyword).pipe(map((res: FlickrOutput) => {
      const urlArr = [];
      res.photos.photo.forEach((ph: FlickrPhoto) => {
        const photoObj = {
          url: `https://farm${ph.farm}.staticflickr.com/${ph.server}/${ph.id}_${ph.secret}_m.jpg`,
          title: ph.title
        };
        urlArr.push(photoObj);
      });
      return urlArr;
    }));
  }

  /**
   * This method is used to get all feeds
   */
  getAllFeeds() {
    return this.http.get<any>(this.baseUrl);
  }
}
