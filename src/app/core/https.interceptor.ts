import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root',
})
export class HttpsInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.ensureHttpsInProduction(req));
  }

  private ensureHttpsInProduction(req: HttpRequest<any>) {
    if (environment.production) {
      return req.clone({
        url: req.url.replace('http://', 'https://'),
      });
    }
    return req;
  }
}
