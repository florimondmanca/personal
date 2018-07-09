# FlorimondManca

[![Python](https://img.shields.io/badge/angular-6-blue.svg)](https://angular.io)
[![Build Status](https://travis-ci.org/florimondmanca/personal.svg?branch=master)](https://travis-ci.org/florimondmanca/personal)
[![Heroku](http://heroku-badge.herokuapp.com/?app=florimondmanca-api&style=flat)](https://florimondmanca.herokuapp.com)

This is the repository for Florimond Manca's personal website.

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

Create an environment file called `.env` (it will not be committed to VCS),
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
