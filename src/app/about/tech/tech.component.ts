import { Component, OnInit } from '@angular/core';
import { CardService } from 'app/social';
import { StaticFiles } from 'app/core';
import { Patch } from '../patchwork/patch.model';

@Component({
  selector: 'app-tech',
  templateUrl: './tech.component.html',
  styleUrls: ['./tech.component.scss']
})
export class TechComponent implements OnInit {

  techs: Patch[] = [
    {
      title: 'Python 3',
      image: 'python.png',
      url: 'https://python.org',
    },
    {
      title: 'Django',
      image: 'django.png',
      url: 'https://djangoproject.com',
    },
    {
      title: 'Django REST Framework',
      image: 'drf.png',
      url: 'http://django-rest-framework.org',
    },
    {
      title: 'Node',
      image: 'node.png',
      url: 'https://nodejs.org',
    },
    {
      title: 'Angular 6',
      image: 'angular.png',
      url: 'https://angular.io',
    },
    {
      title: 'ExpressJS',
      image: 'express.png',
      url: 'https://expressjs.com',
    },
    {
      title: 'Typescript',
      image: 'typescript.jpg',
      url: 'https://typescriptlang.org',
    },
    {
      title: 'Sass',
      image: 'sass.png',
      url: 'https://sass-lang.com',
    },
    {
      title: 'PostgreSQL',
      image: 'postgresql.png',
      url: 'https://postgresql.org',
    },
    {
      title: 'Docker',
      image: 'docker.png',
      url: 'https://docker.com',
    },
    {
      title: 'Nginx',
      image: 'nginx.png',
      url: 'https://nginx.com',
    },
    {
      title: 'CaptainDuckDuck',
      image: 'captainduckduck.png',
      url: 'https://captainduckduck.com',
    },
    {
      title: 'GitHub',
      image: 'github.png',
      url: 'https://github.com',
    },
    {
      title: 'Travis CI',
      image: 'travis-ci.png',
      url: 'https://travis-ci.org',
    },
    {
      title: 'DigitalOcean',
      image: 'digitalocean.png',
      url: 'https://digitalocean.com',
    },
    {
      title: 'AWS S3',
      image: 'aws-s3.png',
      url: 'https://aws.amazon.com/s3',
    },
  ]

  constructor(
    private cards: CardService,
    private staticFiles: StaticFiles,
  ) { }

  ngOnInit() {
    this.cards.configure({
      title: 'About the Tech',
      description: `I built this blog to be my own personal Medium. Discover how it's made.`,
      image: this.staticFiles.imageUrl('tech-stack.png'),
    });
  }

  fullPath(logo: string) {
    return `assets/logos/${logo}`;
  }

}
