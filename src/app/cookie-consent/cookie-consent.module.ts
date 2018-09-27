import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CookieConsentPopupComponent } from './cookie-consent-popup/cookie-consent-popup.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [CookieConsentPopupComponent],
  entryComponents: [CookieConsentPopupComponent],
})
export class CookieConsentModule { }
