import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit, OnDestroy {

  private sub = new Subscription();
  searchControl = new FormControl(null);

  constructor(
    private searchService: SearchService,
  ) { }

  ngOnInit() {
    this.sub.add(this.searchService.onSearch().subscribe());
    this.sub.add(this.searchService.onReset().pipe(
      tap(() => this.searchControl.setValue(null)),
    ).subscribe());
  }

  onChange() {
    const term = this.searchControl.value;
    if (term) {
      this.perform();
    }
  }

  perform() {
    this.searchService.perform(this.searchControl.value);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
