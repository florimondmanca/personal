import { Component } from '@angular/core';
import { swipeAnimation } from '../animations';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [swipeAnimation],
})
export class MainComponent {
  getPage(outlet) {
    return outlet.activatedRouteData['pageId'] || '';
  }
}
