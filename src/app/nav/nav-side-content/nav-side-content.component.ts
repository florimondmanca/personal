import { Component, OnInit } from '@angular/core';
import { PopularTagsService } from 'app/blogging-core';

@Component({
  selector: 'app-nav-side-content',
  templateUrl: './nav-side-content.component.html',
  styleUrls: ['./nav-side-content.component.scss']
})
export class NavSideContentComponent implements OnInit {

  popularTags: string[] = [];

  constructor(private popularTagsService: PopularTagsService) { }

  ngOnInit() {
    this.popularTagsService.list({ limit: 5 }).subscribe((tags) => this.popularTags = tags);
  }

}
