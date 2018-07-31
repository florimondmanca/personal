import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';


@Injectable({
  providedIn: 'root'
})
export class DescriptionService {

  private defaultDescription: string;

  constructor(private meta: Meta) {
    this.defaultDescription = this.meta.getTag('name=description').content;
  }

  set(content: string) {
    this.meta.updateTag({ name: 'description', content });
  }

  reset() {
    this.set(this.defaultDescription);
  }
}
