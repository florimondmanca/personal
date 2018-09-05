import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Post } from '../core';


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
  ) { }

  ngOnInit() {
    this.sub.add(this.route.data.pipe(
      tap((data) => this.posts = data.posts),
    ).subscribe());
    this.sub.add(this.route.paramMap.pipe(
      tap((paramMap) => this.tag = paramMap.get('tag')),
    ).subscribe());
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
