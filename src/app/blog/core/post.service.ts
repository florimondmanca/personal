import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Post, PostAdapter } from './post.model';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseUrl: string = environment.apiUrl + '/posts/';

  constructor(private http: HttpClient, private adapter: PostAdapter) { }

  list(): Observable<Post[]> {
    return this.http.get(this.baseUrl).pipe(
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

  slugExists(slug: string, postId?: string): Observable<boolean> {
    return this.http.get(this.baseUrl, { params: { slug }}).pipe(
      map((data: any[]) => data.map(item => item.slug)),
      map((pks: string[]) => pks.length > 0 && !pks.includes(postId)),
    );
  }
}

@Injectable({
  providedIn: 'root'
})
export class PostListResolver implements Resolve<Post[]> {

  constructor(private service: PostService) {}

  resolve() {
    return this.service.list();
  }

}

@Injectable({
  providedIn: 'root'
})
export class PostDetailResolver implements Resolve<Post> {

  constructor(private service: PostService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const pk: string = route.paramMap.get('pk');
    return this.service.retrieve(pk);
  }

}
