## General Info

This website is served at https://bccookbook.com and is meant for an internal-only cookbook of our recipes.

![Home Screen](https://storage.googleapis.com/recipe-website-269020.appspot.com/public/README-img/home-screen.png)

## Installation

You can build this using npm.

```
$ git clone https://github.com/cweigandt/recipe-website.git
$ cd recipe-website
$ npm run build
$ npm run start-test-env
```

This will run in the test environment with dummy recipes

If you want to set up your own recipes, you will need a few extra files:

- ./server/credentials/firecloud-credentials.json
  - I need to update this with how to export this from firecloud
- ./server/credentials/gcs-credentials.json
  - I need to update this with how to export this from google cloud platform
- ./server/credentials/jwtKey.txt
  - Text file containing one line of only a random UID for JSON web token (can be anything)

## Testing

Using Mocha and Selenium for tests.

See `npm test` and `npm run full-test` scripts.

## Scripts

- `npm run build`
  - Calls `npm install` on both server and client repos
  - Builds the client folder
- `npm run quick-build`
  - Builds the client folder without running npm install
- `npm start`
  - Starts up the server on port 8080
- `npm run dev`
  - Sets the port to 3001 and connects NodeJS debugger
  - Can then hook up Chrome's NodeJS debugger to the server
- `npm run start-test-env`
  - Sets env to TEST (uses mock data)
  - Starts up server
- `npm test`
  - Runs selenium tests
  - Note: Need to start the server before this as it uses localhost:8080
- `npm run full-test`
  - Starts server with 'test' env
  - Runs selenium tests

## License

This code is provided without license.
