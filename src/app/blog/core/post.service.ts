import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post, PostAdapter } from './post.model';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseUrl = environment.apiUrl + '/posts/';

  constructor(private http: HttpClient, private adapter: PostAdapter) { }

  list(): Observable<Post[]> {
    return this.http.get(this.baseUrl).pipe(
      map((data: any[]) => data.map(item => this.adapter.adapt(item))),
    );
  }

  retrieve(postId: string) {
    const url = this.baseUrl + `${postId}/`;
    return this.http.get(url).pipe(
      map((data: any) => this.adapter.adapt(data)),
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
    const id = route.paramMap.get('id');
    return this.service.retrieve(id);
  }

}
