import { Injectable } from '@angular/core';
import { CardService, TwitterTag, OpenGraphTag } from 'app/social-cards';
import { TruncatorService, DescriptionService } from 'app/core';
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
  ) { }

  setUp(post: Post) {
    // Set the description meta tag
    this.description.set(post.description);

    // Set the page title
    this.title.setTitle(post.title);

    // Set the Twitter card tags
    this.cards.setTag(TwitterTag.CARD_TYPE, 'article');
    this.cards.setTag(TwitterTag.TITLE, post.title);
    this.cards.setTag(TwitterTag.DESCRIPTION, post.description);
    this.cards.setTag(TwitterTag.URL, post.absoluteUrl);
    this.cards.setTag(TwitterTag.IMAGE, post.imageUrl);

    // Set the OpenGraph (Facebook) card tags
    this.cards.setTag(OpenGraphTag.CARD_TYPE, 'article');
    this.cards.setTag(OpenGraphTag.SITE_NAME, 'CodeSail');
    this.cards.setTag(OpenGraphTag.TITLE, post.title);
    this.cards.setTag(OpenGraphTag.DESCRIPTION, post.description);
    this.cards.setTag(OpenGraphTag.URL, post.absoluteUrl);
    this.cards.setTag(OpenGraphTag.IMAGE, post.imageUrl);
  }

  tearDown() {
    // Reset page description
    this.description.reset();
  }
}
