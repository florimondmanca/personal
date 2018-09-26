import { Component, OnInit } from '@angular/core';
import { CardService } from 'app/social';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {

  constructor(private cards: CardService) { }

  ngOnInit() {
    this.cards.configure({
      title: 'Privacy Policy',
      description: 'Learn about what data we collect, how we use it, and more.',
    });
  }
}
