import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CookieConsentPopupComponent } from './cookie-consent-popup/cookie-consent-popup.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    OverlayModule,
    PortalModule,
  ],
  declarations: [CookieConsentPopupComponent],
  entryComponents: [CookieConsentPopupComponent],
})
export class CookieConsentModule { }
