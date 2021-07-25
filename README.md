## General Info

This website is served at bccookbook.com and is meant for an internal-only cookbook of our recipes

## Installation

You can build this using npm.
You will need a few extra files:

- Add ./server/credentials/firecloud-credentials.json
- Add ./server/credentials/gcs-credentials.json
- Add ./client/src/api/credentials.js
- (Needs to include an exported API_KEYS object with spoonacular field for its api key)

```
$ git clone https://github.com/cweigandt/recipe-website.git
$ cd ../path/to/the/file
$ npm run build
$ npm start
```

## License

This code is provided without license.
