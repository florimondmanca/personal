import { Component, OnInit } from '@angular/core';
import { CardService } from 'app/social-cards';
import { StaticFiles } from 'app/core';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {

  constructor(private cards: CardService, private staticFiles: StaticFiles) { }

  ngOnInit() {
    this.cards.configure({
      title: 'About me',
      description: `Hi! I'm Florimond. Let's get to know each other.`,
      image: this.staticFiles.imageUrl('profile-banner.jpg'),
    });
  }

}
