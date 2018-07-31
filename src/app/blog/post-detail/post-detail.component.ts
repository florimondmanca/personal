import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AuthService, TruncatorService, DescriptionService } from 'app/core';
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
    private auth: AuthService,
    private truncator: TruncatorService,
    private description: DescriptionService,
    private titleService: Title,
  ) { }

  ngOnInit() {
    const initialTitle = this.titleService.getTitle();
    this.route.data.subscribe(
      (data) => {
        this.post = data.post;
        // SEO:
        // - Set the description meta tag
        this.description.set(this.truncator.words(this.post.content, 30));
        // - Set the page title
        this.titleService.setTitle(this.post.title);
      }
    );
    this.sub.add(this.auth.getUser().subscribe(
      (user) => this.canEdit = user.permissions.canEditPost
    ));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.description.reset();
  }

}
