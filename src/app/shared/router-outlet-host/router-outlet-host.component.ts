import { Component } from '@angular/core';
import { swipeAnimation } from './animations';

@Component({
  selector: 'app-router-outlet-host',
  templateUrl: './router-outlet-host.component.html',
  styleUrls: ['./router-outlet-host.component.scss'],
  animations: [swipeAnimation],
})
export class RouterOutletHostComponent {

  getRouterState(outlet) {
    return outlet.activatedRouteData['pageId'] || '';
  }

}
