import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, Subject, Subscription } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';
import { NgcCookieConsentService, NgcStatusChangeEvent } from 'ngx-cookieconsent';
import { CookieConsentResponse } from './response';


type Status = 'allow' | 'deny';

interface CookieConsentStatusChange {
  status: Status;
}

@Injectable({
  providedIn: 'root'
})
export class CookieConsentService {

  private STATUS_KEY = 'cookieconsent_status';

  statusChange: Subject<CookieConsentStatusChange> = new Subject();
  private statusSubscription: Subscription;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.statusSubscription = this.saveStatusOnChange().subscribe();
  }

  private get status(): Status | null {
    if (isPlatformBrowser(this.platformId)) {
      const status = localStorage.getItem(this.STATUS_KEY);
      if (status === 'allow') {
        return 'allow';
      } else if (status === 'deny') {
        return 'deny';
      } else {
        return null;
      }
    }
    return null;
  }

  private set status(status: Status) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.STATUS_KEY, status);
    }
  }

  private saveStatusOnChange(): Observable<any> {
    return this.onChange().pipe(
      tap((event: CookieConsentStatusChange) => this.status = event.status),
    );
  }

  private onChange(): Observable<CookieConsentStatusChange> {
    return this.statusChange.asObservable();
  }

  onStatusChange(): Observable<string> {
    return this.statusChange.asObservable().pipe(
      map((event) => event.status),
    );
  }

  hasAnswered(): boolean {
    return !!this.status;
  }

  hasConsented(): boolean {
    return this.status === 'allow'
  }

  onAllow(): Observable<any> {
    return this.onStatusChange().pipe(
      filter(status => status === 'allow'),
    );
  }
}
