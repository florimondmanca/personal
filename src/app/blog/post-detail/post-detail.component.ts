import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/core';
import { Post } from '../core';


@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  post: Post;
  canEdit: boolean;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService) { }

  ngOnInit() {
    this.post = this.route.snapshot.data.post;
    this.canEdit = this.auth.getUser().permissions.canEditPost;
  }

}
