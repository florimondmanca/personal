import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RssService {

  links: string[];
  ELEMENT_ID = 'rss-link';  // defined in index.html

  constructor() {
    this.links = [];
  }

  set(link: string) {
    let el = document.getElementById(this.ELEMENT_ID);
    if (!el) {
      el = this.createElement();
      const head = document.getElementById('head');
      head.appendChild(el);
    }
    el.setAttribute('href', link);
  }

  unset() {
    const el = document.getElementById(this.ELEMENT_ID);
    if (el) {
      el.remove();
    }
  }

  private createElement() {
    const el = document.createElement('link');
    el.setAttribute('id', this.ELEMENT_ID);
    el.setAttribute('rel','alternate');
    el.setAttribute('type', 'application/rss+xml');
    el.setAttribute('title', 'RSS Feed');
    return el;
  }

  push(link: string) {
    this.links.push(link);
    this.set(link);
  }

  pop() {
    this.links.pop();
    const link = this.links[this.links.length - 1];
    if (link) {
      this.set(link);
    } else {
      this.unset();
    }
  }

}
