import { Injectable, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { CookieConsentPopupComponent } from './cookie-consent-popup/cookie-consent-popup.component';


@Injectable({
  providedIn: 'root'
})
export class CookieConsentPopupService {

  constructor(private factoryResolver: ComponentFactoryResolver) { }

  createFor(view: ViewContainerRef) {
    const factory = this.factoryResolver.resolveComponentFactory(CookieConsentPopupComponent);
    const popupComponent = factory.create(view.parentInjector);
    view.insert(popupComponent.hostView);
    popupComponent.instance._ref = popupComponent;
  }
}
