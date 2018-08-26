import { Component, Input, OnInit } from '@angular/core';
import { Patch } from './patch.model';

@Component({
  selector: 'app-patchwork',
  templateUrl: './patchwork.component.html',
  styleUrls: ['./patchwork.component.scss']
})
export class PatchworkComponent implements OnInit {

  @Input() patches: Patch[] = [];

  constructor() { }

  ngOnInit() {
  }

}
