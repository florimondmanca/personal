import { Component, Input } from '@angular/core';
import { Post } from '../core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent {

  @Input() posts: Post[] = [];
  @Input() action = '';

  url(post: Post): any[] {
    if (this.action === 'edit') {
      return ['/codesail', post.pk, 'edit'];
    } else {
      return ['/codesail', post.pk];
    }
  }

}
