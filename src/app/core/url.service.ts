import { Injectable, Inject, Injector, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { DOCUMENT } from '@angular/platform-browser';


@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor(private injector: Injector,
    @Inject(DOCUMENT) private document: any,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  public fromRoot(path?: string[]): string {
    path = path || [];
    return [this.siteUrl, ...path].join('/');
  }

  /* Return root URL of the website */
  public get siteUrl(): string {
    if (isPlatformServer(this.platformId)) {
      // If on the server, document is not available.
      // Use the request object we injected via ngExpressEngine (see: server.js)
      return 'http://' + this.injector.get('request').get('host');
    } else {
      return this.document.location.origin;
    }
  }

}
