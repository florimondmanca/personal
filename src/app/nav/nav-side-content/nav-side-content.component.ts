import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PopularTagsService } from 'app/blogging-core';

@Component({
  selector: 'app-nav-side-content',
  templateUrl: './nav-side-content.component.html',
  styleUrls: ['./nav-side-content.component.scss']
})
export class NavSideContentComponent implements OnInit {

  popularTags: string[] = [];
  allShown = false;
  loading = false;

  constructor(private popularTagsService: PopularTagsService) { }

  ngOnInit() {
    this.getTags(5).subscribe();
  }

  private getTags(limit?: number): Observable<string[]> {
    const obs = limit ? this.popularTagsService.list({ limit }) : this.popularTagsService.list();
    this.loading = true;
    return obs.pipe(
      tap(() => this.loading = false),
      tap((tags) => this.popularTags = tags),
    );
  }

  loadAll() {
    this.getTags().pipe(
      tap(() => this.allShown = true),
    ).subscribe();
  }
}
