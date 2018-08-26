import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  links = [
    {
      label: 'The Human Being',
      path: 'me',
    },
    {
      label: 'The Tech',
      path: 'tech',
    },
  ];

}
