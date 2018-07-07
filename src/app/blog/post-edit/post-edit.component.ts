import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../core';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements OnInit {

  post: Post;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.post = this.route.snapshot.data.post;
  }

  onSubmit(event) {
    console.log(event.title);
    console.log(event.content);
  }

}
