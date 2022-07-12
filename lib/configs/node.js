module.exports = {
  "rules": {},
  "plugins": [
    "kuzzle",
  ],
  "extends": [
    "kuzzle/default",
  ],
  "env": {
    "node": true,
    "es6": true,
    "mocha": true
  },
  "parserOptions": {
    "ecmaFeatures": {
      "impliedStrict": false
    },
    "ecmaVersion": 2018
  },
}