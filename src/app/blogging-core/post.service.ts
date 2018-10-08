import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformServer } from '@angular/common';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { AuthService } from 'app/core';
import { Post, PostAdapter } from './post.model';
import { PostPayload } from './post.payload';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseUrl: string = environment.apiUrl + '/posts/';

  constructor(private http: HttpClient, private adapter: PostAdapter) { }

  list(params: { draft?: boolean, tag?: string } = {}): Observable<Post[]> {
    const queryParams: any = {
      draft: params.draft ? '2' : '3',
    };
    if (params.tag) {
      queryParams.tag = params.tag;
    }
    return this.http.get(this.baseUrl, { params: queryParams }).pipe(
      map((data: any) => data['results'] || data),  // Temporary migration fix
      // TODO only get through the results field once pagination is rolled out
      map((data: any[]) => data.map(item => this.adapter.adapt(item))),
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
      map((data: any[]) => data.map(item => item.slug)),
      map((pks: string[]) => pks.length > 0 && !pks.includes(postId)),
    );
  }
}


@Injectable({
  providedIn: 'root'
})
export class PostListResolver implements Resolve<Post[]> {

  constructor(
    private service: PostService,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  resolve() {
    const KEY = makeStateKey<Post[]>('posts');

    if (this.transferState.hasKey(KEY)) {
      const posts = this.transferState.get<Post[]>(KEY, []);
      this.transferState.remove(KEY);
      return of(posts);
    } else {
      return this.service.list({ draft: false }).pipe(
        catchError(() => of([])),
        tap((posts) => {
          if (isPlatformServer(this.platformId)) {
            this.transferState.set(KEY, posts);
          };
        }),
      );
    }
  }
}


@Injectable({
  providedIn: 'root'
})
export class DraftListResolver implements Resolve<Post[]> {

  constructor(
    private service: PostService,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  resolve() {
    const KEY = makeStateKey<Post[]>('posts-drafts');

    if (this.transferState.hasKey(KEY)) {
      const posts = this.transferState.get<Post[]>(KEY, []);
      this.transferState.remove(KEY);
      return of(posts);
    } else {
      return this.service.list({ draft: true }).pipe(
        catchError(() => of([])),
        tap((posts) => {
          if (isPlatformServer(this.platformId)) {
            this.transferState.set(KEY, posts);
          };
        }),
      );
    }
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

@Injectable({
  providedIn: 'root'
})
export class TagPostListResolver implements Resolve<Post[]> {

  constructor(
    private service: PostService,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Post[]> {
    const tag = route.paramMap.get('tag');
    const KEY = makeStateKey<Post[]>('posts-for-tag');

    if (this.transferState.hasKey(KEY)) {
      const posts = this.transferState.get<Post[]>(KEY, []);
      this.transferState.remove(KEY);
      return of(posts);
    } else {
      return this.service.list({ draft: false, tag }).pipe(
        catchError(() => of([])),
        tap((posts) => {
          if (isPlatformServer(this.platformId)) {
            this.transferState.set(KEY, posts);
          };
        }),
      );
    }
  }
}
