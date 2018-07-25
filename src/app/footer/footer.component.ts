import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { faRss } from '@fortawesome/free-solid-svg-icons';
import { faLinkedinIn, faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  faLinkedin = faLinkedinIn;
  faGitHub = faGithub;
  faTwitter = faTwitter;
  faRss = faRss;
  rssFeedUrl: SafeUrl;

  now: Date;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.now = new Date();
    this.rssFeedUrl = this.sanitizer.bypassSecurityTrustUrl(environment.rssFeedUrl);
  }

}
