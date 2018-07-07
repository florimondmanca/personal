import { Injectable } from '@angular/core';
import { IAdapter } from 'app/core';

export class PostSchema {
  id: number;
  title: string;
  content: string;
  slug: string;
  published: Date;
}

export class Post extends PostSchema {

  constructor(args: PostSchema) {
    super();
    Object.assign(this, args);
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
      content: data.content,
      slug: data.slug,
      published: new Date(data.published),
    });
  }
}
