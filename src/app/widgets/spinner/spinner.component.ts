import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {

  @Input() inline = true;
  @Input() diameter: number;

  constructor() { }

  get actualDiameter(): number {
    return this.diameter || (this.inline ? 30 : null);
  }

}
