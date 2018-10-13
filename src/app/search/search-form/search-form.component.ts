import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Subject, from } from 'rxjs';
import { tap, map, filter, mergeMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { AuthService } from 'app/core';
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
    private auth: AuthService,
    private router: Router,
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
