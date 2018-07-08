import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dialogContainer]'
})
export class DialogContainer {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
