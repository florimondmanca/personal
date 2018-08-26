import { Injectable, Inject } from '@angular/core';
import { Meta, DOCUMENT } from '@angular/platform-browser';
import { OpenGraphTag, TwitterTag, OpenGraphCardType, TwitterCardType } from './card-tags';

interface CommonTags {
  title: string;
  description: string;
  url?: string;
  image?: string;
}

interface TwitterTags extends CommonTags {}

interface OpenGraphTags extends CommonTags {
  siteName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private twitterTagMap: Map<string, TwitterTag>;
  private openGraphTagMap: Map<string, OpenGraphTag>;

  constructor(
    private meta: Meta,
    @Inject(DOCUMENT) private document: any,
  ) {
    this.twitterTagMap = new Map([
      ['type', TwitterTag.CARD_TYPE],
      ['title', TwitterTag.TITLE],
      ['description', TwitterTag.DESCRIPTION],
      ['url', TwitterTag.URL],
      ['image', TwitterTag.IMAGE],
    ]);
    this.openGraphTagMap = new Map([
      ['type', OpenGraphTag.CARD_TYPE],
      ['title', OpenGraphTag.TITLE],
      ['description', OpenGraphTag.DESCRIPTION],
      ['url', OpenGraphTag.URL],
      ['siteName', OpenGraphTag.SITE_NAME],
      ['image', OpenGraphTag.IMAGE],
    ]);
  }

  configure(tags: CommonTags, cardType?: { twitter?: TwitterCardType, og?: OpenGraphCardType }) {
    cardType = cardType || {};
    const fullTags = {...tags};
    if (!fullTags.url) {
      fullTags.url = this.document.location.href;
    }
    this.forTwitter(tags, cardType.twitter || (tags.image ? TwitterCardType.SUMMARY_LARGE_IMAGE : TwitterCardType.SUMMARY));
    this.forOpenGraph(tags, cardType.og || OpenGraphCardType.ARTICLE);
  }

  private fromMapping(tags: CommonTags, mapping: Map<string, any>, tagFieldName: string) {
    Object.keys(tags).filter((tagName) => mapping.get(tagName)).forEach((tagName) => {
      this.meta.addTag({
        [tagFieldName]: mapping.get(tagName).toString(),
        content: tags[tagName],
      });
    });
  }

  forTwitter(tags: TwitterTags, type: TwitterCardType) {
    const fullTags = {type: type.toString(), ...tags};
    this.fromMapping(fullTags, this.twitterTagMap, 'name');
  }

  forOpenGraph(tags: OpenGraphTags, type: OpenGraphCardType) {
    const fullTags = {
      type: type.toString(), ...tags,
      siteName: tags.siteName || 'CodeSail',
    };
    this.fromMapping(fullTags, this.openGraphTagMap, 'property');
  }

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
