import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Post } from '../core';
import { UrlService } from 'app/core';
import { CardService } from 'app/social';


function capitalize(value: string): string {
  if (!value) {
    return '';
  }
  return value[0].toUpperCase() + value.substring(1);
}

@Component({
  selector: 'app-tag-post-list',
  templateUrl: './tag-post-list.component.html',
  styleUrls: ['./tag-post-list.component.scss']
})
export class TagPostListComponent implements OnInit, OnDestroy {

  posts: Post[];
  tag: string;
  sub = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private cards: CardService,
    private urlService: UrlService,
  ) { }

  ngOnInit() {
    this.sub.add(this.route.data.pipe(
      tap((data) => this.posts = data.posts),
    ).subscribe());
    this.sub.add(this.route.paramMap.pipe(
      map((paramMap) => paramMap.get('tag')),
      tap((tag) => this.tag = tag),
      map((tag) => capitalize(tag)),
      map((capTag) => ({
        title: `${capTag} - CodeSail by Florimond Manca`,
        description: `${capTag} blog posts on CodeSail.`,
        url: this.urlService.fromRoot(['t', this.tag]),
      })),
      tap((config) => this.cards.configure(config)),
    ).subscribe());
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
