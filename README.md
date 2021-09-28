[![Selenium CI](https://github.com/cweigandt/recipe-website/actions/workflows/selenium_ci.yaml/badge.svg)](https://github.com/cweigandt/recipe-website/actions/workflows/selenium_ci.yaml)[![Unit Tests CI](https://github.com/cweigandt/recipe-website/actions/workflows/unit_ci.yaml/badge.svg)](https://github.com/cweigandt/recipe-website/actions/workflows/unit_ci.yaml)
[![GitHub last commit](https://img.shields.io/github/last-commit/cweigandt/recipe-website.svg?style=flat)]()
[![Activity](https://img.shields.io/github/commit-activity/m/cweigandt/recipe-website)]()
[![Version](https://badge.fury.io/gh/cweigandt%2Frecipe-website.svg)]()

## Table of Contents

- [General Info](#general-info)
- [Installation](#installation)
- [Production](#production)
- [Database](#database)
- [Testing](#testing)
- [Scripts](#scripts)
- [License](#license)

## General Info

This website is served at https://bccookbook.com and is meant for an internal-only cookbook of our recipes.

![Home Screen](https://storage.googleapis.com/recipe-website-269020.appspot.com/public/README-img/home-screen-2.png)

## Installation

You can build this using npm.

```
$ git clone https://github.com/cweigandt/recipe-website.git
$ cd recipe-website
$ npm run build
$ npm run start-test-env
```

This will run in the test environment which installs a mock database

## Production

If you would like to enable `npm start` and connect to your own database, you will need to add the following files and initialize your own database on firecloud.

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

The following is the structure of the database hosted on firecloud.
The only setup you would have to do is create the `global` collection manually.
You can then upload any recipes you want and they should be added to the `recipes` collection with the following format.

```cpp
global
  |
  |___ sections
      |
      |___ data : array<string>

recipes
  |
  |___ $RECIPE NAME 1$
      |
      |___ cookedDates : array<number>      // optional array of unix timestamps for when the recipe was made
      |___ imageLocation : string           // src location of image
      |___ ingredients : array<string>      // e.g. '1 cup of flour'
      |___ name : string                    // name of recipe, can include spaces
      |___ section : string                 // same string as one of the section names in global>sections
      |___ servings : string                // e.g. '4', '3-4', '-' for unknown
      |___ steps : array<string>            // e.g. 'Preheat oven to 350'
      |___ subIngredients1 : array<string>  // optional array
      |___ subIngredients1Name : string     // e.g. 'Cajun Sauce', '' for n/a
      |___ subIngredients2 : string         // optional array
      |___ subIngredients2Name : string     // e.g. 'Crumble Topping', '' for n/a
      |___ tags : array<string>             // array of tags
      |___ thumbnail : string               // src location of smaller image, used for cards
      |___ time : string                    // how long to make, e.g. '1h 30m'
      |___ uploadTime : number              // unix timestamp of when recipe was uploaded
      |___ uploader: string                 // name of uploader
      |___ visits: number                   // optional count of visits to the recipe
  |
  |___ $RECIPE NAME 2$
      |___ ...
```

## Testing

Using `mocha` and `selenium` for integration tests.

Using `jest` and `enzyme` for unit tests.

See **Test** section of **Scripts**

## Scripts

### Build

- `npm run build`
  - _When building from scratch or changing dependencies_
  - Calls `npm install` on both server and client repos
  - Builds the client folder
- `npm run quick-build`
  - _Build only the client-side React app_
  - Builds the client folder without running npm install

### Run

- `npm start`
  - _Run the full db-connected app_
  - Starts up the server on port 8080
- `npm run dev`
  - _Enable NodeJS debugging_
  - Sets the port to 3001 and connects NodeJS debugger
  - Can then hook up Chrome's NodeJS debugger to the server
- `npm run start-test-env`
  - _Start the app without a database_
  - Sets env to TEST (uses mock data)
  - Starts up server

### Test

- Integration
  - `npm test`
    - _Run the selenium integration tests on a pre-opened server_
    - Runs selenium tests
    - Note: Need to start the server before this as it uses localhost:8080
  - `npm run integration`
    - _Run the selenium tests with a new test server_
    - Starts server with 'test' env
    - Runs selenium tests
- Unit
  - `npm run unit-test`
    - _Run client unit tests for changed files_
  - `npm run unit-test-all`
    - _Run all client unit tests_

## License

This code is provided without license.
