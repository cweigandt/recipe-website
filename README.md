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
      |___ createdDates : array<number>     // optional array of unix timestamps for when the recipe was made
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
  |
  |___ $RECIPE NAME 2$
      |___ ...
```

## Testing

Using Mocha and Selenium for tests.

Currently running **29** testpoints

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

```

```
