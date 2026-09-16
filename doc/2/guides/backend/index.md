---
code: false
type: page
order: 200
title: Backend projects
description: Configure eslint-plugin-kuzzle in a Node.js or TypeScript project
---

# Backend projects

`eslint-plugin-kuzzle` is the standard for every Node.js side of Kuzzle:
the core, plugins, SDKs, CLI tools.

## Install

```bash
npm i -D eslint eslint-plugin-kuzzle
```

## Configure

Create an `eslint.config.mjs` at the root of your project:

```js
import kuzzle from 'eslint-plugin-kuzzle';

export default [
  { ignores: ['dist/**', 'coverage/**'] },
  ...kuzzle.configs.default,
  ...kuzzle.configs.node,
  ...kuzzle.configs.typescript,
];
```

::: warning
Order matters. Spread `default` first, then `node`, then `typescript`: the later
configs override the earlier ones, and `typescript` has to disable a handful of
core rules that the TypeScript compiler already covers.
:::

Drop `configs.typescript` in a plain JavaScript project. Drop `configs.node` if
the code does not run on Node.js — it only sets globals and language options.

## Available configs

### `configs.default`

The shared JavaScript rules, on top of `@eslint/js` recommended, plus
`prettier/prettier` as an error. This is the actual coding standard: `curly`,
`eqeqeq`, `no-console`, `no-shadow`, `no-nested-ternary`, `strict`, `yoda`,
`vars-on-top` and about thirty others.

It also registers the plugin under the `kuzzle` namespace, which is what makes
[`kuzzle/array-foreach`](/official-plugins/eslint/2/rules/array-foreach/) and
[`kuzzle/no-then`](/official-plugins/eslint/2/rules/no-then/) resolvable.

### `configs.node`

Globals and language options for Node.js: `globals.node`, `globals.es2023`,
`globals.mocha`, `ecmaVersion: 2023`, and `impliedStrict: false` — the last one
because `configs.default` sets `strict: ['error', 'global']` and expects an
explicit `'use strict'` in CommonJS files.

::: info
The Mocha globals are included unconditionally. If your project uses Vitest or
`node:test` instead, that is harmless — it only means `describe` and `it` are
also defined in non-test files. Override `languageOptions.globals` if you want
them scoped to your test directory.
:::

### `configs.typescript`

`typescript-eslint` recommended, plus the Kuzzle adjustments:

| Rule                                                | Value   | Why                                                                  |
| --------------------------------------------------- | ------- | -------------------------------------------------------------------- |
| `@typescript-eslint/ban-ts-comment`                 | `off`   | `@ts-expect-error` with a comment is a legitimate escape hatch       |
| `@typescript-eslint/explicit-module-boundary-types` | `off`   | inference is good enough, and the annotations rot                    |
| `@typescript-eslint/no-explicit-any`                | `off`   | Kuzzle's payload types are genuinely dynamic                         |
| `no-shadow`                                         | `off`   | replaced by the TypeScript-aware version below                       |
| `@typescript-eslint/no-shadow`                      | `error` | the core rule reports false positives on enums and type declarations |

## Severities

`sort-keys` and `kuzzle/array-foreach` are `warn`, not `error`. Both are
advisory, and every Kuzzle project was overriding them anyway. Raise or silence
them per project:

```js
export default [
  ...kuzzle.configs.default,
  {
    rules: {
      'sort-keys': 'off',
      'kuzzle/array-foreach': 'error',
    },
  },
];
```

## Type-aware linting

None of the shipped rules need type information, so `configs.typescript` does
**not** start a TypeScript program. That keeps the lint fast and, more
importantly, means files outside your `tsconfig.json` — a `test/` directory, for
instance — do not fail to parse.

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

::: warning
`projectService` resolves each file against the nearest `tsconfig.json`. A
directory your build excludes therefore needs its own `tsconfig.json`, or those
files will not parse and ESLint will fail with
`ESLint was configured to run on <file> using parserOptions.project`.
:::

## Prettier

`configs.default` ends with `eslint-plugin-prettier/recommended`, so
`eslint --fix` reformats and there is no second command to run in CI.

Prettier reads your project's own configuration. Without a `.prettierrc` it
falls back to its defaults, which use double quotes and an 80-column width. The
Kuzzle projects use:

```json
{
  "trailingComma": "all",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "semi": true
}
```
