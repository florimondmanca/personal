import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Error, ErrorHint } from './error.model';


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

  private error(text: string, hint: ErrorHint) {
    this.error$.next({ id: this.errorId, text, hint });
    this.errorId++;
  }

  private ourFaultError(what: string, hint: ErrorHint) {
    const text = `Aw, snap! ${what}. 😞`;
    this.error(text, hint);
  }

  serverError() {
    this.ourFaultError('Something went horribly wrong', 'report');
  }

  unknownError() {
    this.ourFaultError('We encountered an unexpected error', 'retry_later');
  }

  badRequestError() {
    this.ourFaultError(`That request didn't make it through`, 'report');
  }
}
