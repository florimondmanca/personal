import { Injectable, ComponentRef } from '@angular/core';
import { of, Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { CookieConsentPopupComponent } from './cookie-consent-popup/cookie-consent-popup.component';

@Injectable({
  providedIn: 'root'
})
export class CookieConsentPopupService {

  constructor(private overlay: Overlay) { }

  createLater(): Observable<void> {
    return of(null).pipe(
      delay(1),  // short delay to avoid issues with change detection
      map(() => {
        const positionStrategy = this.overlay.position().global().bottom();
        const overlayRef = this.overlay.create({
          positionStrategy,
        });
        const portal = new ComponentPortal(CookieConsentPopupComponent);
        const popupRef: ComponentRef<CookieConsentPopupComponent> = overlayRef.attach(portal);
        popupRef.instance._ref = popupRef;
      })
    )
  }
}
