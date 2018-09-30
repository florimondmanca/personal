import { Component, Input } from '@angular/core';
import { ScrollService } from 'app/core';
import { Post } from 'app/blogging-core';


@Component({
  selector: 'app-post-nav',
  templateUrl: './post-nav.component.html',
  styleUrls: ['./post-nav.component.scss']
})
export class PostNavComponent {

  @Input() relative: Post;
  @Input() type: string;

  constructor(private scroll: ScrollService) { }

  get label(): string {
    return this.type === 'previous' ? 'Prev' : 'Next';
  }

  get icon(): string {
    return this.type === 'previous' ? 'navigate_before' : 'navigate_next';
  }

  scrollTop() {
    this.scroll.toTop();
  }

}
