import { Injectable } from '@angular/core';
import { IAdapter } from 'app/core';

class PostMinimalSchema {
  title: string;
  slug: string;
}

export class PostSchema extends PostMinimalSchema {
  id: number;
  description: string;
  content: string;
  created: Date;
  published?: Date;
  isDraft: boolean;
  imageUrl?: string;
  previous?: PostMinimalSchema;
  next?: PostMinimalSchema;
}

export class Post extends PostSchema {

  constructor(args: PostSchema) {
    super();
    Object.assign(this, args);
  }

  get pk(): string {
    return this.slug;
  }
}

@Injectable({
  providedIn: 'root'
})
export class PostAdapter implements IAdapter<Post> {

  adapt(data: any): Post {
    return new Post({
      id: data.id,
      title: data.title,
      slug: data.slug,
      description: data.description,
      content: data.content,
      imageUrl: data.image_url,
      created: new Date(data.created),
      published: data.published ? new Date(data.published) : null,
      isDraft: data.is_draft,
      previous: data.previous ? this.adaptMinimal(data.previous) : null,
      next: data.next ? this.adaptMinimal(data.next) : null,
    });
  }

  private adaptMinimal(data: any): PostMinimalSchema {
    return { title: data.title, slug: data.slug };
  }
}
