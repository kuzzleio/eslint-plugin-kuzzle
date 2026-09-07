# eslint-plugin-vue-kuzzle

Kuzzle Coding Standard for Vue.js.

This plugin is standalone: `eslint-plugin-vue`, `@vue/eslint-config-typescript`,
`@vue/eslint-config-prettier`, `typescript-eslint` and `eslint-plugin-import`
ship with it, so a consuming project only needs `eslint` itself.

## Install

```sh
npm i -D eslint eslint-plugin-vue-kuzzle
```

The plugin is ESM and ships flat configs only. Create an `eslint.config.mjs` at
the root of your project:

```js
import vueKuzzle from 'eslint-plugin-vue-kuzzle';

export default [
  { ignores: ['dist/**', 'dist-ssr/**', 'coverage/**'] },
  ...vueKuzzle.configs.default,
];
```

`.eslintrc.json` and the `plugin:vue-kuzzle/*` syntax are gone: ESLint 9 removed
eslintrc support, and every config is now a plain array you spread.

## Available rule sets

- `vueKuzzle.configs.default`: the full standard — `base`, the Vue-aware
  TypeScript parser setup from `@vue/eslint-config-typescript`, then
  `typescript`. This is what you want unless you have a reason not to
- `vueKuzzle.configs.base`: Vue recommended rules, `import/order`, `no-console`,
  `no-debugger`, then Prettier. No TypeScript
- `vueKuzzle.configs.typescript`: the Kuzzle TypeScript rules alone, applied to
  `.ts`, `.tsx` and `.vue`. Composing this yourself means also providing a
  parser that understands Vue SFCs

## Prettier

`@vue/eslint-config-prettier` runs Prettier as an eslint rule, so `eslint --fix`
reformats. Prettier reads your project's own configuration: without a
`.prettierrc`, it falls back to its defaults, which use double quotes. Add the
config your project actually wants.

## Overriding

`import/order` is opinionated about aliases, and assumes `~` and `@`. Turn it
off, or reconfigure it with the exported helper:

```js
import vueKuzzle from 'eslint-plugin-vue-kuzzle';
import importOptions from 'eslint-plugin-vue-kuzzle/importOptions';

export default [
  ...vueKuzzle.configs.default,
  {
    rules: {
      'import/order': ['error', importOptions(['@src', '@components'])],
    },
  },
];
```

## Migrating from 1.0.0-eslint-9.x

Those prereleases never worked. The published tarball shipped `lib/*.ts` while
`main` pointed at `lib/index.js`, which the build emits to `dist/`, so the
package could not be resolved at all; and the configs inside were still
eslintrc-style (`extends: ["plugin:vue/recommended"]`, `overrides`,
`parserOptions.parser`), which ESLint 9 cannot read. Both are fixed here.

Beyond that:

- `@vue/eslint-config-standard` and `@vue/eslint-config-standard-with-typescript`
  are dropped. Both are eslintrc-only, and StandardJS formatting conflicts with
  Prettier, which the same config then had to undo
- the `eslint-plugin-jest` override is gone. No Kuzzle project uses Jest
- `eslint-plugin-vue` moves from 9 to 10, `@vue/eslint-config-typescript` from
  14.1 to 14.9, `typescript-eslint` from 8.17 to 8.51
- the `./importOption` export is now `./importOptions`, which is the name of the
  file it was always meant to point at
