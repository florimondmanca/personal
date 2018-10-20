import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root',
})
export class HttpsInterceptor implements HttpInterceptor {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.ensureHttpsOnBrowserInProduction(req));
  }

  private local(req: HttpRequest<any>): boolean {
    return req.url.includes('localhost');
  }

  private ensureHttpsOnBrowserInProduction(req: HttpRequest<any>) {
    if (environment.production && isPlatformBrowser(this.platformId) && !this.local(req)) {
      return req.clone({
        url: req.url.replace('http://', 'https://'),
      });
    }
    return req;
  }
}
