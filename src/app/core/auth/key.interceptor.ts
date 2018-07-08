import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';


@Injectable()
export class KeyInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = this.attachKey(request);
    return next.handle(request);
  }

  private attachKey(request): HttpRequest<any> {
    const key: string = environment.apiKey;
    const headers = request.headers.set('Api-Key', key);
    return request.clone({ headers });
  }

}
