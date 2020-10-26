/**
 * This interface defines sections of flickr photo
 */
export interface FlickrPhoto {
    farm: string;
    id: string;
    secret: string;
    server: string;
    title: string;
  }
  
  /**
   * This inteface defines section of flickr output
   */
  export interface FlickrOutput {
    photos: {
      photo: FlickrPhoto[];
    };
  }