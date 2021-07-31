## General Info

This website is served at https://bccookbook.com and is meant for an internal-only cookbook of our recipes.

![Home Screen](https://storage.googleapis.com/recipe-website-269020.appspot.com/public/README-img/home-screen.png)

## Installation

You can build this using npm.

You will need a few extra files:

- ./server/credentials/firecloud-credentials.json
  - I need to update this with how to export this from firecloud
- ./server/credentials/gcs-credentials.json
  - I need to update this with how to export this from google cloud platform
- ./server/credentials/jwtKey.txt
  - Text file containing one line of only a random UID for JSON web token (can be anything)
- ./client/src/api/credentials.js
  - Needs to include an exported `API_KEYS` object with `spoonacular` field for its api key

```
$ git clone https://github.com/cweigandt/recipe-website.git
$ cd recipe-website
$ npm run build
$ npm start
```

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

## License

This code is provided without license.
