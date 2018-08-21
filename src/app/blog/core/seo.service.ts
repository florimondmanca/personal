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
    this.cards.setName(TwitterTag.CARD_TYPE, 'summary_large_image');
    this.cards.setName(TwitterTag.TITLE, post.title);
    this.cards.setName(TwitterTag.DESCRIPTION, post.description);
    this.cards.setName(TwitterTag.URL, post.absoluteUrl);
    this.cards.setName(TwitterTag.IMAGE, post.imageUrl);

    // Set the OpenGraph (Facebook) card tags
    this.cards.setProp(OpenGraphTag.CARD_TYPE, 'article');
    this.cards.setProp(OpenGraphTag.SITE_NAME, 'CodeSail');
    this.cards.setProp(OpenGraphTag.TITLE, post.title);
    this.cards.setProp(OpenGraphTag.DESCRIPTION, post.description);
    this.cards.setProp(OpenGraphTag.URL, post.absoluteUrl);
    this.cards.setProp(OpenGraphTag.IMAGE, post.imageUrl);
  }

  tearDown() {
    // Reset page description
    this.description.reset();
  }
}
