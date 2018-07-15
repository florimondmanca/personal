import { Component } from '@angular/core';
import { swipeAnimation } from './animations';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  animations: [swipeAnimation],
})
export class BlogComponent {
  getPage(outlet) {
    return outlet.activatedRouteData['pageId'] || '';
  }
}
