import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Post, CursorPaginator, PostService } from 'app/blogging-core';
import { SearchService } from 'app/search';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit, OnDestroy {

  paginator: CursorPaginator<Post>;
  searchTerm: string;
  sub = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private searchService: SearchService,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.sub.add(this.route.paramMap.pipe(
      tap((paramMap) => this.searchTerm = paramMap.get('term')),
      tap(() => this.cd.markForCheck()),
    ).subscribe());
    this.sub.add(this.route.data.pipe(
      tap((data) => this.paginator = data.paginator),
      tap(() => this.postService.reset(this.paginator.results)),
      tap(() => this.cd.markForCheck()),
    ).subscribe());
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    // Reset search when leaving this component
    this.searchService.reset();
  }

}
