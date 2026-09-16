# eslint-plugin-kuzzle

The Kuzzle coding standard, packaged as ESLint plugins.

This monorepo publishes two independent packages. They do not depend on each
other — a full-stack repository installs both, one per workspace.

| Package                                           | For                                          | Version                                                                                                                 |
| ------------------------------------------------- | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| [`eslint-plugin-kuzzle`](./packages/backend)      | Node.js / TypeScript backends, plugins, SDKs | [![npm](https://img.shields.io/npm/v/eslint-plugin-kuzzle)](https://www.npmjs.com/package/eslint-plugin-kuzzle)         |
| [`eslint-plugin-vue-kuzzle`](./packages/frontend) | Vue.js 3 frontends                           | [![npm](https://img.shields.io/npm/v/eslint-plugin-vue-kuzzle)](https://www.npmjs.com/package/eslint-plugin-vue-kuzzle) |

📖 **[Full documentation](https://docs.kuzzle.io/official-plugins/eslint/1/)**

## Quick start

Backend:

```sh
npm i -D eslint eslint-plugin-kuzzle
```

```js
// eslint.config.mjs
import kuzzle from 'eslint-plugin-kuzzle';

export default [
  { ignores: ['dist/**'] },
  ...kuzzle.configs.default,
  ...kuzzle.configs.node,
  ...kuzzle.configs.typescript,
];
```

Vue.js:

```sh
npm i -D eslint eslint-plugin-vue-kuzzle
```

```js
// eslint.config.mjs
import vueKuzzle from 'eslint-plugin-vue-kuzzle';

export default [{ ignores: ['dist/**'] }, ...vueKuzzle.configs.default];
```

Both packages are ESM and ship flat configs only: `.eslintrc.json` and the
`plugin:kuzzle/*` syntax are gone. Both are standalone — everything they compose
is a dependency, so a consuming project only needs `eslint` itself.

## Custom rules

Shipped by `eslint-plugin-kuzzle`, under the `kuzzle` namespace:

| Rule                                                                                            | Description                                  | Default      |
| ----------------------------------------------------------------------------------------------- | -------------------------------------------- | ------------ |
| [`kuzzle/array-foreach`](https://docs.kuzzle.io/official-plugins/eslint/1/rules/array-foreach/) | enforce `for..of` loops over `Array.forEach` | `warn`       |
| [`kuzzle/no-then`](https://docs.kuzzle.io/official-plugins/eslint/1/rules/no-then/)             | enforce `async/await` over Promise chains    | off (opt-in) |

## Requirements

|            |                                            |
| ---------- | ------------------------------------------ |
| Node.js    | `^20.19.0 \|\| >=22.12.0`                  |
| ESLint     | `^9.10.0 \|\| ^10.0.0`                     |
| TypeScript | `>=5.2.0 <6.1.0`, optional peer dependency |

## Repository layout

```
packages/backend/    eslint-plugin-kuzzle       — configs + custom rules + tests
packages/frontend/   eslint-plugin-vue-kuzzle   — Vue configs + importOptions helper
doc/1/               the pages published at docs.kuzzle.io/official-plugins/eslint/1/
```

## Development

```sh
npm ci          # install every workspace
npm run build   # turbo run build   — tsc, lib/ → dist/
npm run lint    # turbo run lint    — lints the plugins themselves
npm run test    # turbo run test    — vitest, RuleTester
```

The tasks run through [Turborepo](https://turbo.build) and are cached; the
per-package scripts live in each `packages/*/package.json`.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for commit conventions, branches and
the release process.
