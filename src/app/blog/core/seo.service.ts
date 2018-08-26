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

    this.cards.configure({
      title: post.title,
      description: post.description,
      url: post.absoluteUrl,
      image: post.imageUrl,
    });

  }

  tearDown() {
    // Reset page description
    this.description.reset();
  }
}
