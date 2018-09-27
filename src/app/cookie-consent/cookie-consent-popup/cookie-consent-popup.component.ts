import { Component, OnInit, ComponentRef } from '@angular/core';
import { CookieConsentService } from '../cookie-consent.service';

@Component({
  selector: 'app-cookie-consent-popup',
  templateUrl: './cookie-consent-popup.component.html',
  styleUrls: ['./cookie-consent-popup.component.scss']
})
export class CookieConsentPopupComponent implements OnInit {

  _ref: ComponentRef<CookieConsentPopupComponent>;

  constructor(private ccService: CookieConsentService) { }

  ngOnInit() {
  }

  onDeny() {
    this.ccService.statusChange.next({ status: 'deny' });
    this.close();
  }

  onAllow() {
    this.ccService.statusChange.next({ status: 'allow' });
    this.close();
  }

  close() {
    this._ref.destroy();
  }

}
