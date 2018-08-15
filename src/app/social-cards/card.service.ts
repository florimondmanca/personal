import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { OpenGraphTag, TwitterTag } from './card-tags';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private meta: Meta) { }

  setTag(tag: OpenGraphTag | TwitterTag , value: string) {
    if (!value) {
      return;
    }
    this.meta.addTag({ name: tag.toString(), content: value });
  }
}
