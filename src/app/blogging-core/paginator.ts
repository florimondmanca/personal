import { Observable } from 'rxjs';
import { URLSearchParams } from '@angular/http';
import * as qs from 'querystring';

export class CursorPaginator<T> {

  // NOTE: next is a fully qualified URL
  constructor(public next: string, private _results: T[]) { }

  get results(): T[] {
    return this._results;
  }

  static empty<T>(): CursorPaginator<T> {
    return new CursorPaginator<T>(null, []);
  }
}
