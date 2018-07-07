import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSubmit(event) {
    console.log(event.title);
    console.log(event.content);
  }

}
