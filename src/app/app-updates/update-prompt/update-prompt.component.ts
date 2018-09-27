import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

interface PromptResult {
  accept: boolean;
}

@Component({
  selector: 'app-update-prompt',
  templateUrl: './update-prompt.component.html',
  styleUrls: ['./update-prompt.component.scss']
})
export class UpdatePromptComponent implements OnInit {

  private close: Subject<PromptResult> = new Subject();

  constructor() { }

  ngOnInit() { }

  onClose(): Observable<PromptResult> {
    return this.close.asObservable();
  }

  update() {
    this.close.next({ accept: true });
  }

  dismiss() {
    this.close.next({ accept: false });
  }

}
