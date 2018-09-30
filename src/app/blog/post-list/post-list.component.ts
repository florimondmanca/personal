import { Component, Input } from '@angular/core';
import { Post } from '../core';
import { ScrollService } from 'app/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent {

  @Input() posts: Post[] = [];
  @Input() action = '';
  @Input() ifEmpty = 'No blog posts here yet. Stay tuned!';

  constructor(private scroll: ScrollService) { }

  scrollTop() {
    this.scroll.toTop();
  }

  getLink(post: Post): string[] {
    if (this.action === 'edit') {
      return ['/', post.slug, 'edit'];
    } else {
      return ['/', post.slug];
    }
  }

}
