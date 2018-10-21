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
    const token: string = environment.apiToken;
    const secretKey: string = environment.apiSecretKey;
    const headers = request.headers.set('Api-Token', token).set('Api-Secret-Key', secretKey);
    return request.clone({ headers });
  }

}
