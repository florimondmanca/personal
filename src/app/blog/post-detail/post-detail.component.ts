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
    private meta: Meta,
  ) { }

  ngOnInit() {
    const initialTitle = this.titleService.getTitle();
    this.route.data.subscribe(
      (data) => {
        this.post = data.post;
        this.optimizeSEO();
      }
    );
    this.sub.add(this.auth.getUser().subscribe(
      (user) => this.canEdit = user.permissions.canEditPost
    ));
  }

  // See: https://neilpatel.com/blog/open-graph-meta-tags/
  optimizeSEO() {
    // Set the description meta tag
    this.description.set(this.truncator.words(this.post.content, 30));
    // Set the page title
    this.titleService.setTitle(this.post.title);
    // Set the OpenGraph properties (for social network display)
    this.meta.addTags([
      { name: 'og:title', content: this.post.title },
      { name: 'og:url', content: this.post.absoluteUrl },
      { name: 'og:type', content: 'article' },
      // TODO: use a dedicated description field instead
      { name: 'og:description', content: this.getDescription(this.post) },
      { name: 'og:site_name', content: 'CodeSail' },
      // TODO when post has thumbnail
      // { name: 'og:image', content: this.post.thumbnail },
    ]);
    // Set the Twitter card properties
    this.meta.addTags([
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: this.post.title },
      // TODO: use a dedicated description field instead
      { name: 'twitter:description', content: this.getDescription(this.post) },
      { name: 'twitter:url', content: this.post.absoluteUrl },
      // TODO when post has thumbnail
      // { name: 'twitter:image', content: this.post.thumbnail },
    ]);
  }

  teardownSEO() {
    // Reset page description
    this.description.reset();
    // Remove OpenGraph and Twitter tags
    const tags = [
      'og:title',
      'og:url',
      'og:type',
      'og:description',
      'og:site_name',
      'twitter:card',
      'tiwtter:title',
      'twitter:description',
      'twitter:url',
    ]
    tags.forEach(tag => this.meta.removeTag(`name=${tag}`));
  }

  getDescription(post: Post): string {
    return this.truncator.words(post.content, 30);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.teardownSEO();
  }

}
