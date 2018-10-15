import { Component, Input } from '@angular/core';
import { Patch } from './patch.model';

@Component({
  selector: 'app-patchwork',
  templateUrl: './patchwork.component.html',
  styleUrls: ['./patchwork.component.scss']
})
export class PatchworkComponent {

  @Input() patches: Patch[] = [];

}
