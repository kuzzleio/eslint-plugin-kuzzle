---
code: false
type: page
order: 500
title: Migrating
description: Migrate to eslint-plugin-kuzzle 1.x and eslint-plugin-vue-kuzzle 2.x
---

# Migrating

## Backend: from `eslint-plugin-kuzzle` 0.0.x

The 0.0.x line was eslintrc-based and targeted ESLint 8.

**1. Move the configuration.** ESLint 9 removed eslintrc support. Delete
`.eslintrc.json` and `.eslintignore`, and write an `eslint.config.mjs` instead —
see [Backend projects](/official-plugins/eslint/1/guides/backend/). The
`plugin:kuzzle/*` syntax is gone; configs are arrays you spread.

**2. Remove the TypeScript packages.** `@typescript-eslint/eslint-plugin` and
`@typescript-eslint/parser` must leave your `package.json`: the plugin depends
on `typescript-eslint` directly, and two copies in one lint run conflict.

**3. Expect these rules to be gone.**

| Removed                                                                                                                             | Replacement                                                                                                                                                      |
| ----------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `semi`, `keyword-spacing`, `comma-spacing`, `object-curly-spacing`, `no-multi-spaces`, `no-multiple-empty-lines`, `linebreak-style` | `prettier/prettier` — they were deprecated in ESLint core and redundant                                                                                          |
| `no-catch-shadow`                                                                                                                   | `no-shadow` covers it                                                                                                                                            |
| `no-native-reassign`                                                                                                                | `no-global-assign`                                                                                                                                               |
| `no-new-require`                                                                                                                    | none — ESLint moved the Node.js rules out of core to `eslint-plugin-n`                                                                                           |
| `no-return-await`                                                                                                                   | none. Deprecated in core; use `@typescript-eslint/return-await`, which needs [type-aware linting](/official-plugins/eslint/1/guides/backend/#type-aware-linting) |
| the `eslint-plugin-jest` blocks                                                                                                     | none. No Kuzzle project uses Jest                                                                                                                                |

**4. Two severities changed.** `sort-keys` and
[`kuzzle/array-foreach`](/official-plugins/eslint/1/rules/array-foreach/) are
`warn` instead of `error`.

## Frontend: from `eslint-plugin-vue-kuzzle` 1.x

`eslint-plugin-import` is replaced by
[`eslint-plugin-import-x`](https://github.com/un-ts/eslint-plugin-import-x), the
maintained fork. The rule it provides is renamed, and nothing else changes:

| 1.x            | 2.x              |
| -------------- | ---------------- |
| `import/order` | `import-x/order` |

`importOptions()` is untouched — same call, same option object, same ordering.

**Rename every mention of the rule in your own configuration**, including
`eslint-disable` comments:

```diff
-      'import/order': ['error', importOptions(['@src', '@components'])],
+      'import-x/order': ['error', importOptions(['@src', '@components'])],
```

```diff
-// eslint-disable-next-line import/order
+// eslint-disable-next-line import-x/order
```

An override left on `import/order` is silently ignored — the rule no longer
exists under that name, so ESLint applies the Kuzzle default instead of yours.
A stale `eslint-disable` comment is reported by `--report-unused-disable-directives`.

The reason for the swap: `eslint-plugin-import` 2.32.0, its latest release,
calls `sourceCode.getTokenOrCommentBefore()`, which ESLint 10 removed. The rule
crashed the whole lint run rather than reporting, so the package could not
honour the ESLint 10 half of its peer range.

## Frontend: from `eslint-plugin-vue-kuzzle` 1.0.0-eslint-9.x

::: warning
Those prereleases never worked, and there is no configuration to carry over.
The published tarball shipped `lib/*.ts` while `main` pointed at
`lib/index.js` — which the build emits to `dist/` — so the package could not be
resolved at all; and the configs inside were still eslintrc-style (`extends:
["plugin:vue/recommended"]`, `overrides`, `parserOptions.parser`), which ESLint
9 cannot read. Both are fixed in 1.0.0.
:::

Beyond that:

- `@vue/eslint-config-standard` and
  `@vue/eslint-config-standard-with-typescript` are dropped. Both are
  eslintrc-only, and StandardJS formatting conflicts with Prettier, which the
  same config then had to undo
- the `eslint-plugin-jest` override is gone
- `eslint-plugin-vue` moves from 9 to 10, `@vue/eslint-config-typescript` from
  14.1 to 14.9, `typescript-eslint` from 8.17 to 8.70
- the `./importOption` export is now `./importOptions`, which is the name of the
  file it was always meant to point at
