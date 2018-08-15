# Personal

[![Angular](https://img.shields.io/badge/angular-6-blue.svg)](https://angular.io)
[![Build Status](https://travis-ci.org/florimondmanca/personal.svg?branch=master)](https://travis-ci.org/florimondmanca/personal)
[![DigitalOcean](https://img.shields.io/badge/digitalocean-deployed-green.svg)](https://digitalocean.com)

This is the repository for Florimond Manca's personal website frontend application.

This website also hosts CodeSail, a blog about web development and software engineering written by yours truely.

[See it live](http://blog.florimondmanca.com)

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
- `BACKEND_URL`: the URL to the backend root **without trailing slash**
- `API_URL`: the URL to the API root **without trailing slash**
- `ADMIN_SITE_URL`: the URL to the API administration

For example:

```
API_KEY=...
BACKEND_URL=http://localhost:8000
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

[TravisCI](https://travis-ci.org) is configured on this repo and generates a production build on every push to a branch.

## SEO

Server side rendering is implemented using [Angular Universal](https://angular.io/guide/universal#angular-universal-server-side-rendering) to enhance referencing and integration with social media.

## Deployment

Deployment is configured in `.travis.yml`. After a successful CI build:

- Static files are securely uploaded using `rsync` to a server running on DigitalOcean.
- A deploy is triggered via [CaptainDuckDuck](https://captainduckduck.com).

This deploy updates the Docker container that runs the NodeJS app — an Express server which serves server-rendered pages and static files.
