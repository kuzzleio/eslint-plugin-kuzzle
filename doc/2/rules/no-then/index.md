---
code: true
type: page
order: 200
title: kuzzle/no-then
description: Enforce async/await syntax over Promise chains
---

# kuzzle/no-then

Enforce `async/await` syntax over Promise chains.

|                               |                        |
| ----------------------------- | ---------------------- |
| Package                       | `eslint-plugin-kuzzle` |
| Type                          | suggestion             |
| Severity in `configs.default` | not enabled — opt-in   |
| Fixable                       | no                     |
| Requires type information     | no                     |

::: info
This rule ships with the plugin but **no config turns it on**. Spreading
`kuzzle.configs.default` registers it under the `kuzzle` namespace; enabling it
is a deliberate choice, see [Enabling](#enabling).
:::

---

## Rationale

`.then()` / `.catch()` chains and `async/await` express the same thing, and
mixing both in one codebase makes control flow harder to follow: a `.catch()`
attached below an `await` does not catch what a reader expects, and a forgotten
`return` inside a `.then()` silently swallows the rest of the chain.

Kuzzle backend code is `async/await` throughout. This rule keeps it that way.

## Incorrect

```js
function loadUser(id) {
  return sdk.document
    .get('app', 'users', id)
    .then((user) => enrich(user))
    .catch((error) => {
      context.log.error(error);
      throw error;
    });
}
```

## Correct

```js
async function loadUser(id) {
  try {
    const user = await sdk.document.get('app', 'users', id);

    return enrich(user);
  } catch (error) {
    context.log.error(error);
    throw error;
  }
}
```

## Enabling

```js
// eslint.config.mjs
import kuzzle from 'eslint-plugin-kuzzle';

export default [
  ...kuzzle.configs.default,
  ...kuzzle.configs.node,
  {
    rules: {
      'kuzzle/no-then': 'warn',
    },
  },
];
```

Start at `warn`, see what it reports on your codebase, then promote it to
`error`.

## Known limitation

The rule matches **any** member expression named `then` or `catch`, without
checking that the receiver is a Promise. A `try { … } catch (error) { … }`
statement is fine — that is not a member expression — but these are all
reported:

- `emitter.catch`, or a domain object that happens to expose a `.then()` method;
- a `then` property on a plain object or a mock;
- the places where a chain is genuinely clearer, such as a deliberate
  fire-and-forget `.catch(context.log.error)` on a promise you do not await.

Silence those inline:

```js
// eslint-disable-next-line kuzzle/no-then -- deliberate fire-and-forget
refreshCache().catch(context.log.error);
```

## Configuration

The rule takes no options. The two messages it reports are
`Prefer async/await to Promise.then()` and
`Prefer async/await to Promise.catch()`.
