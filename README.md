# NOTICE

Now unused. See [florimondmanca/www](https://github.com/florimondmanca/www).

---

# Personal

[![Build Status](https://img.shields.io/travis/florimondmanca/personal.svg?style=flat-square)](https://travis-ci.org/florimondmanca/personal)
[![Angular](https://img.shields.io/badge/angular-7-blue.svg?style=flat-square)](https://angular.io)
[![DigitalOcean](https://img.shields.io/badge/digitalocean-deployed-0069fe.svg?style=flat-square)](https://digitalocean.com)

This is the repository for the **frontend application** powering my [personal blog](https://blog.florimond.dev).

For the backend API, see [personal-api](https://github.com/florimondmanca/personal-api).

## Install

Install Angular CLI:

```bash
$ npm install -g @angular/cli
```

Install the dependencies:

```bash
$ npm install
```

## Quickstart

Create an environment file called `.env` (it will be excluded from version control) at the project root, containing the following variables:

- `API_KEY`: a valid API key created via the backend admin site.
- `BACKEND_URL`: the URL to the backend root (**without trailing slash**).

For example:

```bash
# .env
API_KEY=myapikey
BACKEND_URL=http://localhost:8000
```

Generate your development environment file:

```bash
$ npm run config -- --env=dev
```

Start the development server, which will run on `http://localhost:4200/`:

```bash
$ ng serve -c dev
```

## Using server-side rendering

Server side rendering is implemented using [Angular Universal](https://angular.io/guide/universal#angular-universal-server-side-rendering).

Server-side rendering allows to send fully-rendered HTML pages to clients, instead of sending them a blank page and letting Angular fill it in the browser. This reduces the "first meaningful paint" time, helps with referencing and allows integration with social media.

To use the server-rendered app, you must first create a build of the app:

```bash
$ npm run build:dev
```

> Note: in production, use `npm run build` instead to create a production-optimized build.

Then start the server-rendered app (an Express server):

```bash
$ npm run serve:ssr
```

## Scripts

See `package.json` for the available NPM scripts.

## CI/CD

[TravisCI](https://travis-ci.org) is configured on this repo and generates a production build on every push to a branch.
