import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../core';

@Component({
  selector: 'app-drafts',
  templateUrl: './drafts.component.html',
  styleUrls: ['./drafts.component.scss']
})
export class DraftsComponent implements OnInit {

  posts: Post[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.posts = this.route.snapshot.data.posts;
  }

}
