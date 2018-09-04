import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Post } from '../core';
import { CardService } from 'app/social-cards';
import { StaticFiles, DescriptionService, UrlService } from 'app/core';
import { environment } from 'environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts: Post[] = [];

  constructor(
    private route: ActivatedRoute,
    private cards: CardService,
    private title: Title,
    private staticFiles: StaticFiles,
    private urlService: UrlService,
    private description: DescriptionService,
  ) { }

  ngOnInit() {
    this.posts = this.route.snapshot.data.posts;
    this.setUpCards();
  }

  private setUpCards() {
    this.cards.configure({
      title: this.title.getTitle(),
      description: this.description.get(),
      url: this.urlService.fromRoot(),
      image: this.staticFiles.imageUrl('codesail-full-600x355.png'),
    })
  }

}
