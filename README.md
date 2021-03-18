# NsSlideshow description

This is a TEST app that creates a screen of slideshow(s) based on provided API key. 

Currently due to the issue with CORS from the original API, I had to use a mock API [QuickMocker](https://quickmocker.com). From there I could also easily simulate multiple playlists (so you should be able to see 2 playlists on the screen currently). It could be any number of playlists on the screen depending on the data provided by API and it should scale automatically with a simple CSS.

It is generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.4.

## How to run the app?

First run `npm i`. Then run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

## TODO

1. Add pre-loading of media resources on the app level
2. Add automatic video playing
3. Cover with unit tests
## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).