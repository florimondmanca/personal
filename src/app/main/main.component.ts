import { Component } from '@angular/core';
import { homeSwipeAnimation } from '../animations';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [homeSwipeAnimation],
})
export class MainComponent {
  getPage(outlet) {
    return outlet.activatedRouteData['pageId'] || '';
  }
}
