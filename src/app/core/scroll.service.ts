import { Injectable } from '@angular/core';
import jump from 'jump.js';


@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  toTop(duration: number = 500) {
    jump('#top', { duration });
  }
}
