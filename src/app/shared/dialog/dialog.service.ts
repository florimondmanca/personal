import { Injectable, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';
import { DialogSettings, DIALOG_SETTINGS_DEFAULTS } from './settings';


@Injectable()
export class Dialog {

  constructor(private factory: ComponentFactoryResolver) {}

  public open(settings: DialogSettings): DialogComponent {
    if (!settings.actions) {
      settings.actions = DIALOG_SETTINGS_DEFAULTS.actions;
    }
    const viewContainerRef = settings.container.viewContainerRef;
    viewContainerRef.clear();

    let componentFactory = this.factory.resolveComponentFactory(DialogComponent);
    let componentRef = viewContainerRef.createComponent(componentFactory);
    const component: DialogComponent = componentRef.instance;

    component.title = settings.title;
    component.body = settings.body;
    component.actions = settings.actions;

    return component;
  }
}
