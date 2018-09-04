import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';


@Injectable({
  providedIn: 'root'
})
export class DescriptionService {

  private defaultDescription: string;
  private value: string;

  constructor(private meta: Meta) {
    this.defaultDescription = this.meta.getTag('name=description').content;
    this.value = this.defaultDescription;
  }

  set(content: string) {
    this.meta.updateTag({ name: 'description', content });
    this.value = content;
  }

  get(): string {
    return this.value;
  }

  reset() {
    this.set(this.defaultDescription);
  }
}
