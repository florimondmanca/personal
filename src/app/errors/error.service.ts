import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Error } from './error.model';


@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private errorId: number;
  private error$: Subject<Error>;

  constructor() {
    this.errorId = 0;
    this.error$ = new Subject();
  }

  onError(): Observable<Error> {
    return this.error$.asObservable();
  }

  private error(text: string) {
    this.error$.next({ id: this.errorId, text });
    this.errorId++;
  }

  serverError() {
    const text = `Aw, snap! Something went horribly wrong. 😞 We need to fix this. Fancy reporting the issue?`;
  }

  unknownError() {
    const text = `Aw, snap! We encountered an unexpected error. 😞 Please try again in a few moments.`;
    this.error(text);
  }
}
