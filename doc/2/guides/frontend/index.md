---
code: false
type: page
order: 300
title: Vue.js projects
description: Configure eslint-plugin-vue-kuzzle in a Vue 3 project
---

# Vue.js projects

`eslint-plugin-vue-kuzzle` is the standard for the Vue 3 frontends: the admin
console, the IoT platform console, the PaaS console, the project templates.

## Install

```bash
npm i -D eslint eslint-plugin-vue-kuzzle
```

## Configure

```js
// eslint.config.mjs
import vueKuzzle from 'eslint-plugin-vue-kuzzle';

export default [
  { ignores: ['dist/**', 'dist-ssr/**', 'coverage/**'] },
  ...vueKuzzle.configs.default,
];
```

That single spread is the whole standard. The other two configs exist for
projects that need to compose something different.

## Available configs

### `configs.default`

`base`, then the Vue-aware TypeScript parser setup from
`@vue/eslint-config-typescript`, then `typescript`. This is what you want unless
you have a reason not to — and a **JavaScript-only frontend is such a reason**,
see below.

### `configs.base`

`eslint-plugin-vue` flat/recommended, `import-x/order`, `no-console`,
`no-debugger`, then Prettier last. No TypeScript, so no parser for `<script
lang="ts">`.

**This is the config to spread on a frontend written in plain JavaScript.**
`configs.default` brings in `@vue/eslint-config-typescript`, which turns on
`vue/block-lang` — the rule that requires a `lang` attribute on every `<script>`
block. On a project with no `.ts` and no `tsconfig.json`, that reports every
single component and nothing else: the error is about the config being the wrong
one, not about the code.

```js
// eslint.config.mjs — a Vue 3 frontend in plain JavaScript
import vueKuzzle from 'eslint-plugin-vue-kuzzle';

export default [{ ignores: ['dist/**', 'coverage/**'] }, ...vueKuzzle.configs.base];
```

Switch to `configs.default` the day the project adopts TypeScript.

### `configs.typescript`

The Kuzzle TypeScript rules alone, scoped to `**/*.ts`, `**/*.tsx` and
`**/*.vue`:

| Rule                                             | Why                                                                     |
| ------------------------------------------------ | ----------------------------------------------------------------------- |
| `@typescript-eslint/consistent-type-imports`     | inline `import { type Foo }`, so the bundler can drop type-only imports |
| `@typescript-eslint/no-import-type-side-effects` | the counterpart: never emit an import that only carried types           |
| `@typescript-eslint/method-signature-style`      | one signature style in interfaces                                       |
| `vue/eqeqeq`                                     | `eqeqeq` applies to templates too, not only to `<script>`               |
| `vue/html-self-closing`                          | `<MyComponent />` rather than `<MyComponent></MyComponent>`             |

::: warning
This config **does not set a parser**. Composing it on its own means also
providing one that understands Vue SFCs (`vue-eslint-parser` with
`@typescript-eslint/parser` for the script blocks). `configs.default` already
does that through `@vue/eslint-config-typescript`.
:::

## Prettier

`@vue/eslint-config-prettier` runs Prettier as an ESLint rule, so `eslint --fix`
reformats. As on the backend, Prettier reads your project's own `.prettierrc`
and falls back to double quotes without one — add the config your project
actually wants.

## Overriding `import-x/order`

`import-x/order` is opinionated about aliases, and `configs.base` assumes the two
Kuzzle projects use: `~` and `@`. If yours are different, reconfigure the rule
with the exported helper rather than rewriting the option object:

```js
import vueKuzzle from 'eslint-plugin-vue-kuzzle';
import importOptions from 'eslint-plugin-vue-kuzzle/importOptions';

export default [
  ...vueKuzzle.configs.default,
  {
    rules: {
      'import-x/order': ['error', importOptions(['@src', '@components'])],
    },
  },
];
```

`importOptions` takes an alias or a list of aliases and returns the full option
object: `vue` first, then external packages, then aliased `.vue` components,
then relative components, then everything else, with a blank line between groups
and alphabetical sorting inside each. Passing your own aliases keeps that
ordering instead of losing it.

To turn the rule off entirely:

```js
{
  rules: {
    'import-x/order': 'off',
  },
}
```
