---
code: false
type: page
order: 400
title: Tips
description: Editors, CI, monorepos, ignores and disabling rules with the Kuzzle ESLint standard
---

# Tips

## Add the npm scripts

Every Kuzzle repository exposes the same two:

```json
{
  "scripts": {
    "lint": "eslint",
    "lint:fix": "eslint --fix"
  }
}
```

ESLint 9 lints the current directory when given no argument, so there is no glob
to keep in sync with the project layout. What gets skipped is controlled by the
`ignores` entry of your flat config, not by a `.eslintignore` — that file is no
longer read.

## Ignore files in flat config

An object with **only** an `ignores` key is global; anywhere else, `ignores`
applies to that config object alone.

```js
export default [
  // Global: these are never linted
  { ignores: ['dist/**', 'coverage/**', '**/*.generated.ts'] },

  ...kuzzle.configs.default,

  // Scoped: this override applies to everything except the test directory
  {
    ignores: ['tests/**'],
    rules: { 'no-console': 'error' },
  },
];
```

`node_modules/**` and `.git/**` are ignored by ESLint itself — no need to list
them.

## Relax the rules in tests

Test files legitimately break rules the production code should not:

```js
export default [
  ...kuzzle.configs.default,
  ...kuzzle.configs.node,
  ...kuzzle.configs.typescript,
  {
    files: ['tests/**/*.ts', '**/*.test.ts'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      'func-names': 'off',
    },
  },
];
```

Put the override **after** the spreads, otherwise the configs reset it.

## Disable a rule inline

Prefer an inline disable with a reason over turning a rule off project-wide:

```js
// eslint-disable-next-line kuzzle/array-foreach -- Headers only exposes forEach
headers.forEach((value, name) => request.setHeader(name, value));
```

The `--` separator is ESLint's syntax for a description; it is reported in
`--report-unused-disable-directives`, which is worth enabling in CI so that
stale disables get cleaned up:

```bash
eslint --report-unused-disable-directives-severity error
```

## Monorepos

Each workspace gets its own `eslint.config.mjs` and its own devDependency —
a backend workspace on `eslint-plugin-kuzzle`, a frontend one on
`eslint-plugin-vue-kuzzle`. Running them from the root through Turborepo keeps
the cache per package:

```json
{
  "tasks": {
    "lint": {
      "inputs": ["lib/**", "src/**", "eslint.config.mjs"]
    }
  }
}
```

Do not try to serve both standards from a single root config: the two packages
each bundle their own `typescript-eslint`, and merging them in one run gives
duplicate rule definitions.

## Editors

**VS Code** — the ESLint extension needs to be told that flat config is in use
on older versions, and which languages to lint:

```json
{
  "eslint.useFlatConfig": true,
  "eslint.validate": ["javascript", "typescript", "vue"],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

Do **not** also enable the Prettier extension as the formatter. Both packages
run Prettier through ESLint, so a separate Prettier format-on-save means two
formatters fighting over the same file.

**JetBrains** — Settings → Languages & Frameworks → JavaScript → Code Quality
Tools → ESLint → _Automatic ESLint configuration_ picks the flat config up on
its own; check "Run eslint --fix on save".

## CI

```yaml
- run: npm ci
- run: npm run lint
```

Lint on the same Node.js majors the package supports (20, 22, 24) if you also
publish a library; a single job is enough for an application.

::: info
Run the lint job **before** the tests. It is an order of magnitude faster, and
catches the class of mistake that makes the tests confusing to read.
:::

## Upgrading

Both packages are released by `semantic-release` from conventional commits, so
the version tells you what to expect. Anything that can make a previously
passing lint fail — a new rule enabled by default, a severity raised from `warn`
to `error`, a dropped Node.js or ESLint version — goes out as a **major**.

```bash
npm i -D eslint-plugin-kuzzle@latest
npm run lint -- --fix
```
