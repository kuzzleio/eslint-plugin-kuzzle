# eslint-plugin-kuzzle

Kuzzle Coding Standard

## Installation

Install ESLint and the plugin

```sh
npm i eslint eslint-plugin-kuzzle
```


## Usage

Add `kuzzle` to the plugins section of your `.eslintrc` configuration file and select the default rule set:

```json
{
  "plugins": ["kuzzle"],
  "extends": [
    "plugin:kuzzle/default",
    "plugin:kuzzle/node",
    "plugin:kuzzle/typescript",
  ]
}

```

## Available rule sets

  - `plugin:kuzzle/default`: default rules between all javascript projects
  - `plugin:kuzzle/node`: rules for Node.js projects
  - `plugin:kuzzle/typescript`: rules for Typescript projects



