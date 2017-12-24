# YABP - Yet Another Boilerplate Project

## Tech stack

* Typescript
* tslinter
* Express
* GraphQL
* MongoDB/Mongoose
* Gulp
* React
* MobX (yes, there's life outside React/Redux)
* mobx-router
* Chai
* Mocha
* Bootstrap
* Docker

### Features

* Automated tests on MobX without mocks
* Seeds and fixtures

### Steps to run

It is necessary to have MongoDB running to properly run the server

`yarn`
`gulp bundle:webapp`
`gulp start:server`

### Running on production

Remove `.env` from the repository
Add `uglify`
