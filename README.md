# Personal

[![Angular](https://img.shields.io/badge/angular-6-blue.svg)](https://angular.io)
[![Build Status](https://travis-ci.org/florimondmanca/personal.svg?branch=master)](https://travis-ci.org/florimondmanca/personal)
[![DigitalOcean](https://img.shields.io/badge/digitalocean-deployed-green.svg)](https://digitalocean.com)

This is the repository for Florimond Manca's personal website frontend application.

This website also hosts CodeSail, a blog about web development and software engineering written by yours truely.

[See it live](http://www.florimondmanca.com)

## Install

Install Angular CLI

```bash
$ npm install -g @angular/cli
```

Install the dependencies:

```bash
$ npm install
```

Create an environment file called `.env` (this filename is excluded from version control),
containing the following variables:

- `API_KEY`: a valid API key created via the API administration
- `API_URL`: the URL to the API root **without trailing slash**
- `ADMIN_SITE_URL`: the URL to the API administration

For example:

```
API_KEY=...
API_URL=http://localhost:8000/api
ADMIN_SITE_URL=http://localhost:8000/admin
```

Generate your development environment file:

```bash
$ npm run config -- --env=dev
```

You can now start the development server, which will run on `http://localhost:4200/`:

```bash
$ ng serve -c dev
```

## CI/CD

Travis CI is configured on this repo and generates a production build on every push to a branch.

## Deployment

Deployment is configured in `.travis.yml`. After a successful CI build, the content of the build is securely uploaded using `rsync` to a server running on DigitalOcean.

On the server, an Nginx container (powered by [CaptainDuckDuck](https://captainduckduck.com)) serves the uploaded files. Here is an exerpt of the Nginx configuration for this app:

```nginx
server {
  # ...
  root /nginx-shared/dist;
  index index.html index.htm;

  location / {
    try_files $uri $uri/ /index.html;
  }
}
```
