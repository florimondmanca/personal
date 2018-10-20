import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-side-content',
  templateUrl: './nav-side-content.component.html',
  styleUrls: ['./nav-side-content.component.scss']
})
export class NavSideContentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onClickAbout() {
    alert('about!');
  }

}
