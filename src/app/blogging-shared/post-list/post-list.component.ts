import { Component, Input } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ScrollService } from 'app/core';
import { Post, PostService, CursorPaginator } from 'app/blogging-core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent {

  @Input() paginator: CursorPaginator<Post>;
  @Input() action = '';
  @Input() ifEmpty = 'No blog posts here yet. Stay tuned!';

  posts: Post[];
  loadingMore = false;

  constructor(
    private scroll: ScrollService,
    private postService: PostService,
  ) { }

  ngOnInit() {
    if (this.paginator) {
      this.posts = this.paginator.results;
    } else {
      this.posts = [];
    }
  }

  scrollTop() {
    this.scroll.toTop();
  }

  getLink(post: Post): string[] {
    if (this.action === 'edit') {
      return ['/a/', post.slug, 'edit'];
    } else {
      return ['/', post.slug];
    }
  }

  hasMorePosts(): boolean {
    return !!this.paginator.next;
  }

  // TODO: how to trigger loadMore() when scrolling down to bottom of list?
  loadMore() {
    this.loadingMore = true;
    this.postService.list({ url: this.paginator.next }).pipe(
      tap(() => this.loadingMore = false),
      tap((paginator) => this.posts = this.posts.concat(paginator.results)),
      tap((paginator) => this.paginator = paginator),
    ).subscribe();
  }

}
