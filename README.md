# NsSlideshow description

This is a TEST app that creates a screen of slideshow(s) based on provided API key. 

Currently due to the issue with CORS from the original API, I had to use a mock API [QuickMocker](https://quickmocker.com). From there I could also easily simulate multiple playlists (so you should be able to see 2 playlists on the screen currently). It could be any number of playlists on the screen depending on the data provided by API and it should scale automatically with a simple CSS.

The app is generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.4.

## How to run the app?

First run `npm i`. Then run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

# Sample screen keys

Use one of the keys below to run the slideshow(s).
1 playlist: 0f127773-529f-4ff8-b211-af9e5c22a5bc
2 playlists: 0f127773-529f-4ff8-b211-af9e5c22a5bd
The last will produce 2 playlists playing simultaneously on the screen.

## Running unit tests

Added few sample unit tests to the app. Run `ng test` to execute them via [Karma](https://karma-runner.github.io).