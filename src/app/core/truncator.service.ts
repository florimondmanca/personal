import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TruncatorService {

  DEFAULT_REPL = '…';

  words(text: string, numWords: number, repl?: string): string {
    repl = repl || this.DEFAULT_REPL;
    const words = text.split(' ');
    if (words.length <= numWords) {
      return text;
    } else {
      return words.slice(0, numWords).join(' ') + repl;
    }
  }
}
