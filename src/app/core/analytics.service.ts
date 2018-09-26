import { Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';


@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private angulartics: Angulartics2) { }

  public activate() {
    // Page tracks will be sent
    this.angulartics.settings.developerMode = false;
    console.log('Google Analytics enabled');
  }

  public deactivate() {
    // Page tracks will NOT be sent
    this.angulartics.settings.developerMode = true;
    console.log('Google Analytics disabled');
  }
}
