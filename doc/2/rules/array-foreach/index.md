---
code: true
type: page
order: 100
title: kuzzle/array-foreach
description: Enforce for..of loops over Array.forEach
---

# kuzzle/array-foreach

Enforce `for..of` loops over `Array.forEach`.

|                               |                        |
| ----------------------------- | ---------------------- |
| Package                       | `eslint-plugin-kuzzle` |
| Type                          | suggestion             |
| Severity in `configs.default` | `warn`                 |
| Fixable                       | no                     |
| Requires type information     | no                     |

---

## Rationale

`Array.prototype.forEach` takes a callback, and a callback cannot `await`,
cannot `break`, cannot `continue`, and cannot `return` out of the enclosing
function. In backend code that is almost always what you end up needing:

```js
// The awaits resolve inside the callbacks, so `done()` runs before a single
// document has been indexed.
documents.forEach(async (document) => {
  await index(document);
});

done();
```

`for..of` has none of those problems, reads the same, and is faster on large
arrays because there is no per-element function call.

## Incorrect

```js
users.forEach((user) => {
  context.log.info(user.name);
});

Object.keys(config).forEach((key) => register(key));
```

## Correct

```js
for (const user of users) {
  context.log.info(user.name);
}

for (const key of Object.keys(config)) {
  register(key);
}
```

Awaiting now works, and so does stopping early:

```js
for (const document of documents) {
  if (!document.active) {
    continue;
  }

  await index(document);
}

await done();
```

## Chained calls

The rule reports the `forEach` call, wherever it sits in a chain. Collapsing the
chain into one loop is usually the point:

```js
// Reported — and iterates three times
users
  .filter((user) => user.active)
  .map((user) => user.name)
  .forEach(send);

// Once
for (const user of users) {
  if (user.active) {
    send(user.name);
  }
}
```

## Known limitation

The rule matches **any** call expression whose callee property is named
`forEach`, whatever the receiver — it has no type information, so it cannot tell
an array from something else. A `Map`, a `Set`, a `NodeList`, `Headers` or a
third-party collection whose only iteration API is `forEach` is reported too.

That is why it is a `warn` and not an `error`. Silence it where the callback
form is the right one:

```js
// eslint-disable-next-line kuzzle/array-foreach -- Headers only exposes forEach
headers.forEach((value, name) => request.setHeader(name, value));
```

## Configuration

The rule takes no options.

```js
// eslint.config.mjs
export default [
  ...kuzzle.configs.default,
  {
    rules: {
      // Promote it once the codebase is clean
      'kuzzle/array-foreach': 'error',
      // …or opt out entirely
      // 'kuzzle/array-foreach': 'off',
    },
  },
];
```
