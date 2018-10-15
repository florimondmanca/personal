import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformServer } from '@angular/common';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { AuthService } from 'app/core';
import { Post, PostAdapter } from './post.model';
import { PostPayload } from './post.payload';
import { environment } from 'environments/environment';
import { CursorPaginator } from './paginator';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseUrl: string = environment.apiUrl + '/posts/';
  private reset$: Subject<Post[]> = new Subject();

  constructor(private http: HttpClient, private adapter: PostAdapter) { }

  list(params: { draft?: boolean, tag?: string, cursor?: string, search?: string, url?: string } = {}): Observable<CursorPaginator<Post>> {
    let url: string;
    let queryParams: any;

    // If URL is given, is it directly.
    if (params.url) {
      url = params.url;
      queryParams = null;
    } else {
      url = this.baseUrl;
      queryParams = {
        draft: params.draft ? '2' : '3',
      };
      if (params.tag) {
        queryParams.tag = params.tag;
      }
      if (params.search) {
        queryParams.search = params.search;
      }
    }

    return this.http.get(url, { params: queryParams }).pipe(
      map((data: any) => this.adapter.forPagination(data)),
    );
  }

  retrieve(pk: string): Observable<Post> {
    const url = this.baseUrl + `${pk}/`;
    return this.http.get(url).pipe(
      map((data: any) => this.adapter.adapt(data)),
    );
  }

  update(pk: string, args: PostPayload): Observable<Post> {
    const url = this.baseUrl + `${pk}/`;
    return this.http.put(url, args).pipe(
      map((data: any) => this.adapter.adapt(data)),
    );
  }

  create(args: PostPayload): Observable<Post> {
    return this.http.post(this.baseUrl, args).pipe(
      map((data: any) => this.adapter.adapt(data)),
    );
  }

  destroy(pk: string): Observable<void> {
    const url = this.baseUrl + `${pk}/`;
    return this.http.delete(url).pipe(map(() => null));
  }

  publish(pk: string): Observable<Post> {
    const url = this.baseUrl + `${pk}/publication/`;
    return this.http.patch(url, {}).pipe(
      map((data: any) => this.adapter.adapt(data)),
    )
  }

  slugExists(slug: string, postId?: string): Observable<boolean> {
    return this.http.get(this.baseUrl, { params: { slug } }).pipe(
      map((data: any) => data['results']),
      map((results: any[]) => results.map(item => item.slug)),
      map((pks: string[]) => pks.length > 0 && !pks.includes(postId)),
    );
  }

  // Event handling functions

  reset(posts: Post[]) {
    this.reset$.next(posts);
  }

  onReset(): Observable<Post[]> {
    return this.reset$.asObservable();
  }
}


@Injectable({
  providedIn: 'root'
})
export class PaginatedResolverFactory {

  constructor(
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  private resolve(source: Observable<CursorPaginator<Post>>, key: string): Observable<CursorPaginator<Post>> {
    const KEY = makeStateKey<CursorPaginator<Post>>(key);
    if (this.transferState.hasKey(KEY)) {
      const paginator = this.transferState.get(KEY, CursorPaginator.empty<Post>());
      this.transferState.remove(KEY);
      return of(paginator);
    } else {
      return source.pipe(
        catchError(() => of(CursorPaginator.empty<Post>())),
        tap((paginator) => {
          if (isPlatformServer(this.platformId)) {
            this.transferState.set(KEY, paginator);
          };
        }),
      );
    }
  }

  resolveFor(opts: { source: Observable<CursorPaginator<Post>>, key: string }) {
    return this.resolve(opts.source, opts.key);
  }
}


@Injectable({
  providedIn: 'root'
})
export class PostListResolver implements Resolve<CursorPaginator<Post>> {

  constructor(
    private service: PostService,
    private factory: PaginatedResolverFactory,
  ) { }

  resolve() {
    return this.factory.resolveFor({
      source: this.service.list({ draft: false }),
      key: 'posts-list',
    });
  }
}


@Injectable({
  providedIn: 'root'
})
export class DraftListResolver implements Resolve<CursorPaginator<Post>> {

  constructor(
    private service: PostService,
    private factory: PaginatedResolverFactory,
  ) { }

  resolve() {
    return this.factory.resolveFor({
      source: this.service.list({ draft: true }),
      key: 'drafts-list',
    });
  }
}


@Injectable({
  providedIn: 'root'
})
export class TagPostListResolver implements Resolve<CursorPaginator<Post>> {

  constructor(
    private service: PostService,
    private factory: PaginatedResolverFactory,
  ) { }

  resolve(route: ActivatedRouteSnapshot) {
    const tag = route.paramMap.get('tag');
    return this.factory.resolveFor({
      source: this.service.list({ draft: false, tag }),
      key: 'tag-posts-list',
    });
  }
}

@Injectable({
  providedIn: 'root'
})
export class PostSearchResolver implements Resolve<CursorPaginator<Post>> {

  constructor(
    private service: PostService,
    private factory: PaginatedResolverFactory,
  ) { }

  resolve(route: ActivatedRouteSnapshot) {
    const searchTerm = route.paramMap.get('term');
    return this.factory.resolveFor({
      source: this.service.list({ draft: false, search: searchTerm }),
      key: 'posts-search-results',
    });
  }
}

@Injectable({
  providedIn: 'root'
})
export class PostDetailResolver implements Resolve<Post> {

  private result: Post;

  constructor(
    private router: Router,
    private service: PostService,
    private auth: AuthService,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  getPost(pk): Observable<Post | null> {
    return this.service.retrieve(pk).pipe(
      catchError(() => of(null)),
      tap((post: Post) => this.result = post),
      map((post: Post) => {
        if (!post) {
          return null;
        }
        // If post is a draft, it is only accessible if logged in
        if (post.isDraft && !this.auth.isLoggedIn) {
          this.router.navigate(['/not-found']);
          return null;
        }
        return post;
      }),
    );
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Post> {
    const pk: string = route.paramMap.get('pk');
    const KEY = makeStateKey<Post>('post-' + pk);

    if (this.transferState.hasKey(KEY)) {
      const post = this.transferState.get<Post>(KEY, null);
      this.transferState.remove(KEY);
      return of(post);
    } else {
      return this.getPost(pk).pipe(
        tap((post: Post) => {
          if (isPlatformServer(this.platformId)) {
            this.transferState.set(KEY, post);
          };
        }),
      );
    }
  }
}
