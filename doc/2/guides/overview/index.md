---
code: false
type: page
order: 100
title: Overview
description: What the Kuzzle ESLint standard is and which package to install
---

# Overview

[eslint-plugin-kuzzle](https://github.com/kuzzleio/eslint-plugin-kuzzle) is the
Kuzzle coding standard, packaged as ESLint plugins. It is what every Kuzzle
project — the core, the official plugins, the SDKs, the consoles — lints with,
so that a rule discussion happens once here rather than in every repository.

The repository is a monorepo publishing two independent packages:

| Package                    | For                                          | npm                                                           |
| -------------------------- | -------------------------------------------- | ------------------------------------------------------------- |
| `eslint-plugin-kuzzle`     | Node.js / TypeScript backends, plugins, SDKs | [npm](https://www.npmjs.com/package/eslint-plugin-kuzzle)     |
| `eslint-plugin-vue-kuzzle` | Vue.js 3 frontends                           | [npm](https://www.npmjs.com/package/eslint-plugin-vue-kuzzle) |

They do not depend on each other. A full-stack repository installs both, one per
workspace.

## Batteries included

Both packages are standalone: everything they compose is a **dependency**, not a
peer dependency. A consuming project installs `eslint` and the plugin, nothing
else.

`eslint-plugin-kuzzle` ships `@eslint/js`, `eslint-config-prettier`,
`eslint-plugin-prettier`, `prettier`, `typescript-eslint` and `globals`.
`eslint-plugin-vue-kuzzle` ships `eslint-plugin-vue`,
`@vue/eslint-config-typescript`, `@vue/eslint-config-prettier`,
`typescript-eslint`, `eslint-plugin-import-x` and `globals`.

::: warning
If your project already depends on `@typescript-eslint/eslint-plugin`,
`@typescript-eslint/parser` or `@vue/eslint-config-standard`, **remove them**.
Two copies of `typescript-eslint` in one lint run produce confusing
"rule not found" and duplicate-report errors.
:::

## Flat config only

Both packages are ESM and export flat configs only. `.eslintrc.json`, `extends`
and the `plugin:kuzzle/*` syntax are gone — ESLint 9 removed eslintrc support.
Configuration lives in an `eslint.config.mjs` at the root of your project, and
every config is a plain array you spread.

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

## Requirements

|            |                                            |
| ---------- | ------------------------------------------ |
| Node.js    | `^20.19.0 \|\| >=22.12.0`                  |
| ESLint     | `^9.10.0 \|\| ^10.0.0`                     |
| TypeScript | `>=5.2.0 <6.1.0`, optional peer dependency |

## Next

- [Backend projects](/official-plugins/eslint/2/guides/backend/) — Node.js and TypeScript
- [Vue.js projects](/official-plugins/eslint/2/guides/frontend/)
- [Tips](/official-plugins/eslint/2/guides/tips/) — editors, CI, overrides, monorepos
- [Rules](/official-plugins/eslint/2/rules/) — the custom Kuzzle rules
- [Migrating](/official-plugins/eslint/2/guides/migration/) — coming from 0.0.x, or from a
  `1.0.0-eslint-9.x` prerelease
