import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Post, PostPayload, PostService, DirtyComponent } from '../core';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements DirtyComponent {

  public dirty = false;

  constructor(
    private router: Router,
    private postService: PostService) { }

  onSubmit(payload: PostPayload) {
    this.postService.create(payload).pipe(
      tap(() => this.dirty = false),
      tap((post: Post) => this.router.navigate(['/', post.pk])),
    ).subscribe();
  }

}
