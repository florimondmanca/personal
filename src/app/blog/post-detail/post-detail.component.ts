import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/core';
import { Subscription } from 'rxjs';
import { Post, SeoService } from '../core';


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
    private auth: AuthService,
    private seo: SeoService,
    private title: Title,
  ) { }

  ngOnInit() {
    const initialTitle = this.title.getTitle();
    this.route.data.subscribe(
      (data) => {
        this.post = data.post;
        this.seo.setUp(this.post);
      }
    );
    this.sub.add(this.auth.getUser().subscribe(
      (user) => this.canEdit = user.permissions.canEditPost
    ));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.seo.tearDown();
  }

}
