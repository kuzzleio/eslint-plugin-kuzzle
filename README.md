# eslint-plugin-kuzzle

Kuzzle Coding Standard.

This plugin is standalone, meaning that `eslint` and `prettier` are included in the package so you don't need to install them yourself.

## Install our coding standard

1) Install the plugin

```sh
npm i eslint-plugin-kuzzle --save-dev
```

2) Add `kuzzle` to the plugins section of your `.eslintrc` configuration file and select the default rule set:

```json
{
  "plugins": ["kuzzle"],
  "extends": [
    "plugin:kuzzle/default",
    "plugin:kuzzle/node",
    "plugin:kuzzle/typescript"
  ]
}
```

3) Run Prettier to format the code accordingly

```sh
npx prettier lib/ test/ features/ --write
```

4) Remove unused eslint-related dependencies (such as `@typescript-eslint/eslint-plugin`, `eslint` etc)

5) Commit relevant files

## Available rule sets

  - `plugin:kuzzle/default`: default rules between all javascript projects
  - `plugin:kuzzle/node`: rules for Node.js projects
  - `plugin:kuzzle/typescript`: rules for Typescript projects

You can disable the `sort-keys` rule on project that are not libraries:

```json
{
  "plugins": ["kuzzle"],
  "extends": [
    "plugin:kuzzle/default",
    "plugin:kuzzle/node",
    "plugin:kuzzle/typescript"
  ],
  "rules": {
    "sort-keys": ["off"]
  }
}
```
