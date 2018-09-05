import { Component, Input } from '@angular/core';
import { Post } from '../core';
import jump from 'jump.js';


@Component({
  selector: 'app-post-nav',
  templateUrl: './post-nav.component.html',
  styleUrls: ['./post-nav.component.scss']
})
export class PostNavComponent {

  @Input() relative: Post;
  @Input() type: string;

  get label(): string {
    return this.type === 'previous' ? 'Prev' : 'Next';
  }

  get icon(): string {
    return this.type === 'previous' ? 'navigate_before' : 'navigate_next';
  }

  scrollTop() {
    jump('#top', { duration: 500 })
  }

}
