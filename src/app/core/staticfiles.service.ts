import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';


@Injectable({
  providedIn: 'root'
})
export class StaticFiles {

  constructor(@Inject(DOCUMENT) private document: any) { }

  /** Return absolute URL to an image located in the assets/img folder.
  NOTE: the URL will only effectively return the image if the server is serving assets.
  */
  imageUrl(fileName: string): string {
    const baseUrl = this.document.location.origin;
    return `${baseUrl}/assets/img/${fileName}`;
  }

}
