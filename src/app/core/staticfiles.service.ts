import { Injectable, Inject, Injector, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class StaticFiles {

  constructor(
    private injector: Injector,
    @Inject(DOCUMENT) private document: any,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  /** Return absolute URL to an image located in the assets/img folder.
  NOTE: the URL will only effectively return the image if the server is serving assets.
  */
  imageUrl(fileName: string): string {
    return `${this.baseUrl}/assets/img/${fileName}`;
  }

  private get baseUrl(): string {
    if (isPlatformServer(this.platformId)) {
      // If on the server, document is not available.
      // Use the request object we injected via ngExpressEngine (see: server.js)
      return 'http://' + this.injector.get('request').get('host');
    } else {
      return this.document.location.origin;
    }
  }

}
