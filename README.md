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

## Production

If you would like to enable `npm start` and connect to your own database, you will need to do the following:

All of the following should be placed in `server/credentials`

- `firecloud-credentials.json`
  - Follow instructions [here](https://firebase.google.com/docs/firestore/quickstart#initialize) under 'Initialize on your own server' using a service account
- `gcs-credentials.json`
  - Follow instructions [here](https://firebase.google.com/docs/firestore/quickstart#initialize) under 'Initialize on your own server' using a service account
- `jwtKey.txt`
  - Text file containing one line of only a random UID for JSON web token (can be anything - I used this [online uuid generator](https://www.uuidgenerator.net/))
- `api-keys.json`
  - JSON object containing the following keys with string values for the api key
    - `spoonacular` - see https://spoonacular.com/food-api

## Database

_Coming soon - structure of the database_

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
