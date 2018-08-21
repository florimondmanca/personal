import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { OpenGraphTag, TwitterTag } from './card-tags';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private meta: Meta) { }

  setName(tag: TwitterTag , value: string) {
    if (!value) {
      return;
    }
    this.meta.addTag({ name: tag.toString(), content: value });
  }

  setProp(tag: OpenGraphTag, value: string) {
    if (!value) {
      return;
    }
    this.meta.addTag({ property: tag.toString(), content: value });
  }
}
