import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogLayoutService } from 'app/blogging-core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit, OnDestroy {

  public isHome: boolean;
  private sub: Subscription;

  constructor(private blogLayoutService: BlogLayoutService) {
    this.sub = new Subscription();
  }

  ngOnInit() {
    this.sub = this.blogLayoutService.isHome$.subscribe(
      (isHome: boolean) => this.isHome = isHome
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
