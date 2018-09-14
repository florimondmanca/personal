import { Injectable, Inject, Injector, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { DOCUMENT } from '@angular/platform-browser';


interface UrlOptions {
  secure: boolean;
}

const DEFAULT_URL_OPTIONS: UrlOptions = { secure: true };


@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor(private injector: Injector,
    @Inject(DOCUMENT) private document: any,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  public fromRoot(path?: string[], opts: UrlOptions = DEFAULT_URL_OPTIONS): string {
    path = path || [];
    return [this.getSiteUrl(opts), ...path].join('/');
  }

  /* Return root URL of the website */
  private getSiteUrl(opts: UrlOptions): string {
    if (isPlatformServer(this.platformId)) {
      // If on the server, document is not available.
      // Use the request object we injected via ngExpressEngine (see: server.js)
      const scheme = opts.secure ? 'https' : 'http';
      return scheme + '://' + this.injector.get('request').get('host');
    } else {
      return this.document.location.origin;
    }
  }

}
