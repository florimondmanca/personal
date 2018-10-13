import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DescriptionService } from 'app/core';
import { Post, CursorPaginator } from 'app/blogging-core';
import { CardService } from 'app/social';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  paginator: CursorPaginator<Post>;

  constructor(
    private route: ActivatedRoute,
    private cards: CardService,
    private title: Title,
    private description: DescriptionService,
  ) { }

  ngOnInit() {
    this.paginator = this.route.snapshot.data.paginator;
    this.setUpCards();
  }

  private setUpCards() {
    this.cards.configure({
      title: this.title.getTitle(),
      description: this.description.get(),
    })
  }

}
