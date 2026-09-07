# eslint-plugin-kuzzle

Kuzzle Coding Standard.

This plugin is standalone: `eslint-config-prettier`, `eslint-plugin-prettier`,
`prettier`, `typescript-eslint` and `globals` ship with it, so a consuming
project only needs `eslint` itself.

## Install

```sh
npm i -D eslint eslint-plugin-kuzzle
```

The plugin is ESM and ships flat configs only. Create an `eslint.config.mjs` at
the root of your project:

```js
import kuzzle from 'eslint-plugin-kuzzle';

export default [
  { ignores: ['lib/**', 'dist/**'] },
  ...kuzzle.configs.default,
  ...kuzzle.configs.node,
  ...kuzzle.configs.typescript,
];
```

`.eslintrc.json` and the `plugin:kuzzle/*` syntax are gone: ESLint 9 removed
eslintrc support, and every config is now a plain array you spread.

## Available rule sets

- `kuzzle.configs.default`: rules shared by every JavaScript project, plus
  `prettier/prettier` as an error
- `kuzzle.configs.node`: globals and language options for Node.js projects
- `kuzzle.configs.typescript`: `typescript-eslint` recommended, plus the Kuzzle
  adjustments

Order matters: spread `default` first, then `node` and `typescript`.

## Type-aware linting

None of the shipped rules need type information, so `configs.typescript` does
**not** enable a TypeScript program. That keeps the lint fast and, more
importantly, means files outside your `tsconfig.json` (a `test/` directory, for
instance) do not fail to parse.

If you want the type-checked `typescript-eslint` rules, opt in yourself:

```js
import kuzzle from 'eslint-plugin-kuzzle';
import tseslint from 'typescript-eslint';

export default [
  ...kuzzle.configs.default,
  ...kuzzle.configs.node,
  ...kuzzle.configs.typescript,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
```

`projectService` resolves each file against the nearest `tsconfig.json`. A
directory that your build excludes therefore needs its own `tsconfig.json`, or
those files will not parse.

## Severities

`sort-keys` and `kuzzle/array-foreach` are warnings, not errors: they are
advisory, and every Kuzzle project was overriding them anyway. Raise or silence
them per project:

```js
{
  rules: {
    "sort-keys": "off",
  },
}
```

## Migrating from 0.0.x

- ESLint 9 or 10 is required, and configuration moves from `.eslintrc.json` to
  `eslint.config.mjs` (see above)
- `@typescript-eslint/eslint-plugin` and `@typescript-eslint/parser` must be
  removed from your project: the plugin depends on `typescript-eslint` directly
- The stylistic rules that Prettier already enforces are gone (`semi`,
  `keyword-spacing`, `comma-spacing`, `object-curly-spacing`, `no-multi-spaces`,
  `no-multiple-empty-lines`, `linebreak-style`). They were deprecated in ESLint
  core and redundant with `prettier/prettier`
- `no-catch-shadow` is dropped (`no-shadow` covers it), `no-native-reassign` is
  replaced by `no-global-assign`, and `no-new-require` is dropped: ESLint moved
  the Node.js rules out of core to `eslint-plugin-n`
- `no-return-await` is dropped. It is deprecated in core with no replacement;
  use `@typescript-eslint/return-await` if you want it back, which needs
  type-aware linting
- The `eslint-plugin-jest` blocks are gone. No Kuzzle project uses Jest
- `sort-keys` and `kuzzle/array-foreach` are `warn` instead of `error`
