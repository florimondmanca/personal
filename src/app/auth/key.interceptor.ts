import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root',
})
export class KeyInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = this.attachApiKey(request);
    return next.handle(request);
  }

  private attachApiKey(request: HttpRequest<any>): HttpRequest<any> {
    const key: string = environment.apiKey;
    const headers = request.headers.set('X-Api-Key', key);
    return request.clone({ headers });
  }

}
