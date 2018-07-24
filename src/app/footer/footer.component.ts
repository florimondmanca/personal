import { Component, OnInit } from '@angular/core';
import { faLinkedinIn, faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  faLinkedin = faLinkedinIn;
  faGitHub = faGithub;
  faTwitter = faTwitter;

  now: Date;

  ngOnInit() {
    this.now = new Date();
  }

}
