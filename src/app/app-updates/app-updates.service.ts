import { Injectable, ComponentRef } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Observable, from } from 'rxjs';
import { mergeMap, filter, map, tap } from 'rxjs/operators';
import { UpdatePromptComponent } from './update-prompt/update-prompt.component';


@Injectable({
  providedIn: 'root'
})
export class AppUpdatesService {

  constructor(
    private updates: SwUpdate,
    private overlay: Overlay,
  ) { }

  onUpdate(): Observable<any> {
    return this.updates.available.pipe(
      mergeMap(() => from(this.updates.activateUpdate())),
      mergeMap(() => this.promptUserForUpdate()),
      filter((accept: boolean) => accept),
    );
  }

  private promptUserForUpdate(): Observable<boolean> {
    const positionStrategy = this.overlay.position().global().bottom().centerHorizontally();
    const overlayRef = this.overlay.create({
      positionStrategy,
    });
    const portal = new ComponentPortal(UpdatePromptComponent);
    const prompt: ComponentRef<UpdatePromptComponent> = overlayRef.attach(portal);
    return prompt.instance.onClose().pipe(
      map(result => result.accept),
      tap(() => prompt.destroy()),
    );
  }

}
