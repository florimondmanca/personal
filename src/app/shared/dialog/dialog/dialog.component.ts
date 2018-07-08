import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { DialogAction } from '../settings';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  title: string;
  body: string;
  actions: DialogAction[];

  private close$: Subject<any> = new Subject();

  constructor(private factory: ComponentFactoryResolver, private vRef: ViewContainerRef) { }

  protected onAction(action: DialogAction) {
      this.close$.next(action.value);
  }

  onClose(): Observable<any> {
    return this.close$.asObservable();
  }

}
