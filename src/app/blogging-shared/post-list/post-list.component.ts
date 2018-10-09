import { Component, Input, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { of } from 'rxjs';
import { tap, catchError, filter } from 'rxjs/operators';
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

  posts: Post[] = [];
  loadingMore = false;

  SCROLL_PERCENT_TRIGGER = 0.6;

  constructor(
    private scroll: ScrollService,
    private postService: PostService,
    @Inject(DOCUMENT) private document: any,
  ) { }

  ngOnInit() {
    this.posts = this.paginator.results;
    this.postService.onReset().subscribe(
      (posts) => this.posts = posts,
    );
  }

  @HostListener('window:scroll', [])
  onScroll() {
    if (!this.hasMorePosts()) {
      return;
    }
    if (this.getScrolledPercentage() > this.SCROLL_PERCENT_TRIGGER && !this.loadingMore) {
      this.loadMore();
    }
  }

  private getScrolledPercentage(): number {
    const scrollTop = this.document.body.scrollTop;
    const bodyHeight = this.document.body.scrollHeight - window.innerHeight;
    const scrollPercentage = (scrollTop / bodyHeight);
    return scrollPercentage;
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
      catchError(() => {
        this.loadingMore = false;
        return of(false);
      }),
      filter(Boolean),
      tap((paginator) => this.posts = this.posts.concat(paginator.results)),
      tap((paginator) => this.paginator = paginator),
    ).subscribe();
  }

}
