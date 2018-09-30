import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DirtyComponent } from './dirty-component.interface';


@Injectable({
  providedIn: 'root'
})
export class CanDeactivateDirtyPost implements CanDeactivate<DirtyComponent> {

  canDeactivate(
    component: DirtyComponent,
    currentRoute,
    currentState,
    nextState,
  ): Observable<boolean> | boolean {
    if (component.dirty) {
      return this.confirm('Discard changes on this blog post?');
    }
    return true;
  }

  private confirm(message): Observable<boolean> {
    const confirmation = window.confirm(message);
    return of(confirmation);
  }
}
