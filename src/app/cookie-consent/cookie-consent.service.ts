import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';
import { NgcCookieConsentService, NgcStatusChangeEvent } from 'ngx-cookieconsent';


@Injectable({
  providedIn: 'root'
})
export class CookieConsentService {

  constructor(private ccService: NgcCookieConsentService) { }

  public hasConsented(): boolean {
    return this.ccService.hasConsented();
  }

  public onAllow(): Observable<void> {
    return this.ccService.statusChange$.pipe(
      filter((event: NgcStatusChangeEvent) => event.status === 'allow'),
      map(() => null),
    );
  }

  public onRevoke(): Observable<void> {
    return this.ccService.revokeChoice$;
  }
}
