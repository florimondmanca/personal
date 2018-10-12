import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Post, CursorPaginator, PostService } from 'app/blogging-core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  paginator: CursorPaginator<Post>;
  sub = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
  ) { }

  ngOnInit() {
    this.route.data.pipe(
      tap((data) => this.paginator = data.paginator),
      tap(() => this.postService.reset(this.paginator.results)),
    ).subscribe();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
