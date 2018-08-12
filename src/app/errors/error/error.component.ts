import { Component, Input, Output, EventEmitter } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {

  @Input() message: string;
  @Output() closed: EventEmitter<void> = new EventEmitter();
  faTimes = faTimes;

  close() {
    this.closed.emit();
  }

}
