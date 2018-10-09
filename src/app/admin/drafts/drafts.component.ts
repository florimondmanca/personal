import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post, CursorPaginator } from 'app/blogging-core';

@Component({
  selector: 'app-drafts',
  templateUrl: './drafts.component.html',
  styleUrls: ['./drafts.component.scss']
})
export class DraftsComponent implements OnInit {

  paginator: CursorPaginator<Post>;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.paginator = this.route.snapshot.data.paginator;
  }

}
