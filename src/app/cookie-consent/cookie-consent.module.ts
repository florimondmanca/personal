import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieConsentPopupComponent } from './cookie-consent-popup/cookie-consent-popup.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CookieConsentPopupComponent],
  entryComponents: [CookieConsentPopupComponent],
})
export class CookieConsentModule { }
