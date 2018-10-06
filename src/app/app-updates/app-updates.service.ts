import { Injectable, ComponentFactoryResolver, ViewContainerRef, ComponentRef } from '@angular/core';
import { Inject } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Observable, from, of } from 'rxjs';
import { mergeMap, filter, map, tap } from 'rxjs/operators';
import { UpdatePromptComponent } from './update-prompt/update-prompt.component';


@Injectable({
  providedIn: 'root'
})
export class AppUpdatesService {

  private view: ViewContainerRef;

  constructor(
    private updates: SwUpdate,
    private factoryResolver: ComponentFactoryResolver,
  ) { }

  init(view: ViewContainerRef) {
    this.view = view;
  }

  onUpdate(): Observable<any> {
    return this.updates.available.pipe(
      mergeMap(() => from(this.updates.activateUpdate())),
      mergeMap(() => this.promptUserForUpdate()),
      filter((accept: boolean) => accept),
    );
  }

  private promptUserForUpdate(): Observable<boolean> {
    const factory = this.factoryResolver.resolveComponentFactory(UpdatePromptComponent);
    const prompt: ComponentRef<UpdatePromptComponent> = factory.create(this.view.parentInjector);
    this.view.insert(prompt.hostView);
    return prompt.instance.onClose().pipe(
      map(result => result.accept),
      tap(() => prompt.destroy()),
    );
  }

}
