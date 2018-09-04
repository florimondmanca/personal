import { Injectable } from '@angular/core';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class StaticFiles {

  constructor(private urlService: UrlService) { }

  /** Return absolute URL to an image located in the assets folder (img subfolder by default).
  NOTE: the URL will only effectively return the image if the server is serving assets.
  */
  imageUrl(fileName: string, opts: { directory?: string } = { directory: 'img' }): string {
    return this.urlService.fromRoot(['assets', opts.directory, fileName]);
  }

}
