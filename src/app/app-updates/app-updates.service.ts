import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { DOCUMENT } from '@angular/common';
import { Observable, from, of } from 'rxjs';
import { mergeMap, filter } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AppUpdatesService {

  constructor(private updates: SwUpdate) { }

  onUpdate(): Observable<any> {
    // Update app immediately when service worker has a new version available
    return this.updates.available.pipe(
      mergeMap(() => from(this.updates.activateUpdate())),
      mergeMap(() => this.promptUserForUpdate()),
      filter((accept: boolean) => accept),
    );
  }

  private promptUserForUpdate(): Observable<boolean> {
    // TODO display a popup to ask user if they want to update now
    return of(false);
  }

}
