import { Injectable, Inject, PLATFORM_ID, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';
import { NgcCookieConsentService, NgcStatusChangeEvent } from 'ngx-cookieconsent';
import { CookieConsentResponse } from './response';
import { CookieConsentPopupComponent } from './cookie-consent-popup/cookie-consent-popup.component';


@Injectable({
  providedIn: 'root'
})
export class CookieConsentService {

  private viewContainer: ViewContainerRef;
  private hidden: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private factoryResolver: ComponentFactoryResolver,
    private ccService: NgcCookieConsentService,
  ) {
    this.factoryResolver = factoryResolver;
  }

  init(view: ViewContainerRef) {
    if (!this.hasAnswered()) {
      this.addPopupComponent(view);
    }
  }

  private addPopupComponent(view: ViewContainerRef) {
    const factory = this.factoryResolver.resolveComponentFactory(CookieConsentPopupComponent);
    const popupComponent = factory.create(view.parentInjector);
    view.insert(popupComponent.hostView);
  }

  hasAnswered(): boolean {
    // Angular Universal support
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('cookieconsent_status');
    }
    return false;
  }

  hasConsented(): boolean {
    // Angular Universal support
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('cookieconsent_status') === 'allow';
    }
    return false;
  }

  onAllow(): Observable<void> {
    return this.ccService.statusChange$.pipe(
      filter((event: NgcStatusChangeEvent) => event.status === 'allow'),
      map(() => null),
    );
  }

  onRevoke(): Observable<void> {
    return this.ccService.revokeChoice$;
  }
}
