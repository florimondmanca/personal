import { Component, OnInit, OnDestroy } from '@angular/core';
import { RssService } from 'app/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit, OnDestroy {

  constructor(private rss: RssService) { }

  ngOnInit() {
    this.rss.push(environment.rssFeedUrl);
  }

  ngOnDestroy() {
    this.rss.pop();
  }

}
