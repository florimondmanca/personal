import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/core';
import { Subscription } from 'rxjs';
import { Post } from '../core';


@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit, OnDestroy {

  post: Post;
  canEdit: boolean;
  private sub = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService) { }

  ngOnInit() {
    this.post = this.route.snapshot.data.post;
    this.sub.add(this.auth.getUser().subscribe(
      (user) => {
        console.log(user);
        this.canEdit = user.permissions.canEditPost;
      }
    ));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
