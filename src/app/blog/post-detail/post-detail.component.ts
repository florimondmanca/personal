import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/core';
import { Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Post, SeoService } from 'app/blogging-core';


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
  ) { }

  ngOnInit() {
    this.route.data.pipe(
      map(data => data.post),
      tap((post) => this.post = post),
      tap(() => this.seo.setUp(this.post)),
    ).subscribe();
    this.sub.add(this.auth.getUser().pipe(
      tap((user) => this.canEdit = user.permissions.canEditPost),
    ).subscribe());
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.seo.tearDown();
  }

}
