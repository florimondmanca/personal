import { Directive, Input, HostBinding } from '@angular/core';

@Directive({
  selector: '[app-tab-link]'
})
export class TabLinkDirective {

  private ELEMENT_CLASS = 'app-tab-link';
  private ACTIVE_CLASS = 'active';

  private _elementClass: string[] = [this.ELEMENT_CLASS, 'no-border'];

  @HostBinding('class')
  get elementClass(): string {
    return this._elementClass.join(' ');
  }

  @Input() set active(active: boolean) {
    if (active) {
      this._elementClass.push(this.ACTIVE_CLASS);
    } else {
      this._elementClass = this._elementClass.filter(x => x !== this.ACTIVE_CLASS);
    }
  }

  constructor() { }

}
