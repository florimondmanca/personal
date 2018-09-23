# Personal

[![Build Status](https://img.shields.io/travis-ci/florimondmanca/personal.svg?style=flat-square)](https://travis-ci.org/florimondmanca/personal)
[![Angular](https://img.shields.io/badge/angular-6-blue.svg?style=flat-square)](https://angular.io)
[![DigitalOcean](https://img.shields.io/badge/digitalocean-deployed-0069fe.svg?style=flat-square)](https://digitalocean.com)
[![CaptainDuckDuck](https://img.shields.io/badge/captainduckduck-quack-fdc73d.svg?style=flat-square)](https://captainduckduck.com)

[![](https://blog.florimondmanca.com/assets/img/codesail-full-repo.png)](https://blog.florimondmanca.com)

This is the repository for the **frontend application** powering [CodeSail](https://blog.florimondmanca.com), my personal website and blog.

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

- `API_KEY`: a valid API key created via the API administration
- `BACKEND_URL`: the URL to the backend root **without trailing slash**

For example:

```bash
# .env
API_KEY=mysecretapikey
BACKEND_URL=http://localhost:8000
```

Generate your development environment file:

```bash
$ npm run config -- --env=dev
```

You can now start the development server, which will run on `http://localhost:4200/`:

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

## Progressive Web App capabilities

In production, a service worker is registered to make the website available offline. This is achieved by caching assets and data.

Angular's service worker extension is not directly compatible with the CLI's development server. To run the service worker locally, you must use the [server-rendered app](#using-server-side-rendering).

## Deployment

Deployment is configured in `.travis.yml`. After a successful CI build:

- Static files are securely uploaded using `rsync` to a server running on DigitalOcean.
- A deploy is triggered via [CaptainDuckDuck](https://captainduckduck.com).

This deploy updates the Docker container that runs the NodeJS app, i.e. the Express server which serves server-rendered pages and static files.
