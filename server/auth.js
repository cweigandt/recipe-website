const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')

// Cookie expires yearly
const jwtExpirySeconds = 60 * 60 * 24 * 365

let jwtKey
if (process.env.NODE_ENV === 'test') {
  jwtKey = 'My_Test_Environment_JWT_Key'
} else {
  jwtKey = fs
    .readFileSync(path.resolve(__dirname, './credentials/jwtKey.txt'))
    .toString()
}

exports.listen = function (app, customDB) {
  const middleware = bodyParser.urlencoded({ extended: true })

  app.post('/signin', middleware, (req, res) => {
    // Get credentials from JSON body
    // Some BS I'm not dealing with now
    const credentialsString = Object.keys(req.body)[0]
    const credentials = JSON.parse(credentialsString)
    const { username, password } = credentials

    if (!username || !password) {
      // return 401 error is username or password doesn't exist
      return res.status(401).end()
    }

    customDB
      .validateCredentials({ username, password })
      .then(() => {
        // Create a new token with the username in the payload
        // and which expires 1y after issue
        const token = jwt.sign({ username }, jwtKey, {
          algorithm: 'HS256',
          expiresIn: jwtExpirySeconds,
        })

        // set the cookie as the token string, with a similar max age as the token
        // here, the max age is in milliseconds, so we multiply by 1000
        res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000 })
        res.status(200)
        res.end()
      })
      .catch(() => {
        res.status(401).end()
      })
  })
}

exports.validateJWT = (req) => {
  const token = req.cookies.token

  if (!token) {
    return false
  }

  let payload
  try {
    // Parse the JWT string and store the result in `payload`.
    // Note that we are passing the key in this method as well. This method will throw an error
    // if the token is invalid (if it has expired according to the expiry time we set on sign in),
    // or if the signature does not match
    payload = jwt.verify(token, jwtKey)
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      // if the error thrown is because the JWT is unauthorized, log it
      console.log('Invalid token')
    }
    // otherwise, return false
    return false
  }

  return true
}
