import { Component, Input, Output, EventEmitter } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Error } from '../error.model';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {

  @Input() error: Error;
  @Output() closed: EventEmitter<void> = new EventEmitter();
  faTimes = faTimes;

  close() {
    this.closed.emit();
  }

  reloadPage() {
    window.location.reload();
  }

}
