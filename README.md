# eslint-plugin-kuzzle

Kuzzle Coding Standard

## Install our coding standard

1) Install ESLint and the plugin

```sh
npm i eslint eslint-plugin-kuzzle
```

2) Add `kuzzle` to the plugins section of your `.eslintrc` configuration file and select the default rule set:

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

3) Run Prettier to format the code accordingly

```sh
echo {}> .prettierrc.json
npx prettier lib/ test/ features/ --write
```

4) Remove unused eslint-related dependencies (such as `@typescript-eslint/eslint-plugin`, etc)

5) Commit relevant files

## Available rule sets

  - `plugin:kuzzle/default`: default rules between all javascript projects
  - `plugin:kuzzle/node`: rules for Node.js projects
  - `plugin:kuzzle/typescript`: rules for Typescript projects

