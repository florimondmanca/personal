import { Injectable } from '@angular/core';
import { CardService, TwitterTag, OpenGraphTag } from 'app/social';
import { TruncatorService, DescriptionService, UrlService } from 'app/core';
import { Title } from '@angular/platform-browser';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private cards: CardService,
    private description: DescriptionService,
    private truncator: TruncatorService,
    private title: Title,
    private urlService: UrlService,
  ) { }

  setUp(post: Post) {
    if (!post) {
      // post may be null in some error cases
      return;
    }

    // Set the description meta tag
    this.description.set(post.description);

    // Set the page title
    this.title.setTitle(post.title);

    const postUrl = this.urlService.fromRoot([post.slug]);

    this.cards.configure({
      title: post.title,
      description: post.description,
      url: postUrl,
      image: post.imageUrl,
    });

  }

  tearDown() {
    // Reset page description
    this.description.reset();
  }
}
