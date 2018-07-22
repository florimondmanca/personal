import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { AuthService } from 'app/core';
import { Post, PostAdapter } from './post.model';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseUrl: string = environment.apiUrl + '/posts/';

  constructor(private http: HttpClient, private adapter: PostAdapter) { }

  list(params?: { draft?: boolean }): Observable<Post[]> {
    params = params || {};
    // 1 for all
    // 2 for true
    // 3 for false
    const draft = params.draft ? '2' : '3';
    return this.http.get(this.baseUrl, { params: { draft } }).pipe(
      map((data: any[]) => data.map(item => this.adapter.adapt(item))),
    );
  }

  retrieve(pk: string): Observable<Post> {
    const url = this.baseUrl + `${pk}/`;
    return this.http.get(url).pipe(
      map((data: any) => this.adapter.adapt(data)),
    );
  }

  update(pk: string, args: { title: string, content: string }): Observable<Post> {
    const url = this.baseUrl + `${pk}/`;
    return this.http.put(url, args).pipe(
      map((data: any) => this.adapter.adapt(data)),
    );
  }

  create(args: { title: string, content: string }): Observable<Post> {
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

  constructor(private service: PostService) { }

  resolve() {
    return this.service.list({ draft: false }).pipe(
      catchError(() => of([]))
    );
  }
}


@Injectable({
  providedIn: 'root'
})
export class DraftListResolver implements Resolve<Post[]> {

  constructor(private service: PostService) { }

  resolve() {
    return this.service.list({ draft: true }).pipe(
      catchError(() => of([]))
    );
  }
}


@Injectable({
  providedIn: 'root'
})
export class PostDetailResolver implements Resolve<Post> {

  constructor(
    private router: Router,
    private service: PostService,
    private auth: AuthService
  ) { }

  resolve(route: ActivatedRouteSnapshot) {
    const pk: string = route.paramMap.get('pk');
    return this.service.retrieve(pk).pipe(
      catchError(() => of(null)),
      map((post: Post) => {
        // If post is a draft, it is only accessible if logged in
        if (post.isDraft && !this.auth.isLoggedIn) {
          this.router.navigate(['/not-found']);
          return null;
        }
        return post;
      }),
    );
  }

}
