import { Component, OnInit, ViewContainerRef, ViewChild, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Post, PostPayload, PostService, DirtyComponent } from '../core';


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
    this.postService.update(this.post.pk, payload).subscribe(
      (post: Post) => this.router.navigate(['/', post.pk]),
      (e) => console.log(e)
    )
  }

  onDelete() {
    this.postService.destroy(this.post.pk).subscribe(
      () => this.router.navigate(['/']),
      (e) => console.log(e),
    )
  }

  onPublish() {
    this.postService.publish(this.post.pk).subscribe(
      () => this.router.navigate(['/']),
    )
  }

  onDirty() {
    this.dirty = true;
  }

}
