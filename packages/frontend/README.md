# eslint-plugin-vue-kuzzle

Kuzzle Coding Standard for Vue.js.

This plugin is standalone, meaning that `eslint` and `prettier` are included in the package so you don't need to install them yourself.

## Install our coding standard

1) Install the plugin

```sh
npm i eslint-plugin-vue-kuzzle --save-dev
```

2) Add `kuzzle` to the plugins section of your `.eslintrc` configuration file and select the default rule set:

```json
{
  "extends": [
    "plugin:vue-kuzzle/defaultt",
    "plugin:vue-kuzzle/base",
    "plugin:vue-kuzzle/typescript"
  ]
}
```

3) Remove unused eslint-related dependencies (such as `@vue/eslint-config-standard`, `eslint` etc)

4) Commit relevant files

## Available rule sets

  - `plugin:vue-kuzzle/default`: default combines base and typecript rules sets
  - `plugin:vue-kuzzle/base`: rules for only Javascript projects
  - `plugin:vue-kuzzle/typescript`: rules for Typescript projects

You can disable the `import/order` rule on project that are not libraries:

```json
{
  "extends": [
    "plugin:vue-kuzzle/default",
  ],
  "rules": {
    "import/order": ["off"]
  }
}
```
