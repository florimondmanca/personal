import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Post, PostPayload, PostService, DirtyComponent } from 'app/blogging-core';


@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements OnInit, DirtyComponent {

  post: Post;
  public dirty = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService) { }

  ngOnInit() {
    this.post = this.route.snapshot.data.post;
  }

  onSubmit(payload: PostPayload) {
    this.postService.update(this.post.pk, payload).pipe(
      tap(() => this.dirty = false),
      tap((post: Post) => this.router.navigate(['/', post.pk])),
    ).subscribe();
  }

  onDelete() {
    this.postService.destroy(this.post.pk).pipe(
      tap(() => this.dirty = false),
      tap(() => this.router.navigate(['/'])),
    ).subscribe();
  }

  onPublish() {
    this.postService.publish(this.post.pk).pipe(
      tap(() => this.dirty = false),
      tap(() => this.router.navigate(['/'])),
    ).subscribe();
  }

  onDirty() {
    this.dirty = true;
  }

}
