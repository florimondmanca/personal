import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';

const SIG_RESET = 'dshhjrstjfRGER34';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private search$: Subject<string> = new Subject();
  private reset$: Subject<void> = new Subject();
  private searching = false;

  constructor(private router: Router) {
    this.onReset().pipe(
      tap(() => this.search$.next(SIG_RESET)),
    ).subscribe();
  }

  public perform(term: string) {
    this.search$.next(term);
  }

  public onSearch(): Observable<string> {
    return this.search$.asObservable().pipe(
      debounceTime(400),
      distinctUntilChanged(),
      filter((term) => term !== SIG_RESET),
      filter(() => !this.searching),
      tap(() => this.searching = true),
      tap((term) => {
        const route = term ? ['search', term] : ['/'];
        this.router.navigate(route);
      }),
      tap(() => this.searching = false),
    );
  }

  public reset() {
    this.reset$.next();
  }

  public onReset(): Observable<void> {
    return this.reset$.asObservable();
  }

}
