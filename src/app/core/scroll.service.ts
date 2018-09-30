import { Injectable } from '@angular/core';
import jump from 'jump.js';


@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  toTop(opts = {duration: 500}) {
    jump('#top', opts);
  }
}
