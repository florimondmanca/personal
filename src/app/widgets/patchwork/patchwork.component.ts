import { Component, Input } from '@angular/core';
import { Patch } from './patch.model';

@Component({
  selector: 'app-patchwork',
  templateUrl: './patchwork.component.html',
  styleUrls: ['./patchwork.component.scss']
})
export class PatchworkComponent {

  @Input() patches: Patch[] = [];

  get filterValues(): string {
    return `
      .393 0 0 0 .607
      0.302 0 0 0 .698
      0.298 0 0 0 .702
      0 0 0 1 0
    `;
  }

}
