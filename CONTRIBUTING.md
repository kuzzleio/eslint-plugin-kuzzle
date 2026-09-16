# Contributing

## Setup

```sh
git clone https://github.com/kuzzleio/eslint-plugin-kuzzle.git
cd eslint-plugin-kuzzle
npm ci
```

`npm ci` installs every workspace and runs `husky`, which wires the Git hooks.

## Commands

All of them run from the root, through Turborepo:

| Command         | What it does                                                                              |
| --------------- | ----------------------------------------------------------------------------------------- |
| `npm run build` | `tsc --build` in each package, `lib/` → `dist/`                                           |
| `npm run lint`  | lints the plugins themselves (`eslint-plugin-eslint-plugin`, `eslint-plugin-n`, Prettier) |
| `npm run test`  | `vitest --run` — the `RuleTester` suites in `packages/backend/tests/`                     |

To work on a single package: `npm run build -w eslint-plugin-kuzzle`.

## Adding a rule

1. `packages/backend/lib/rules/<rule-name>.ts`, exporting a `Rule.RuleModule`
   with `meta.docs.url` built by `docUrl(import.meta)`.
2. Register it in the `rules` object of `packages/backend/lib/index.ts`.
3. Decide whether it goes into `configs.default`
   (`packages/backend/lib/configs/default.ts`). A rule without type information
   will have false positives; start at `warn`, or leave it opt-in.
4. `packages/backend/tests/<rule-name>.test.ts` — valid **and** invalid cases.
5. `doc/1/rules/<rule-name>/index.md`. `docUrl` points there, so a rule without
   a page has a dead `meta.docs.url`.
6. Mention it in the rules table of `README.md` and
   `packages/backend/README.md`.

## Documentation

`doc/1/` holds the pages published at
<https://docs.kuzzle.io/official-plugins/eslint/1/>. One directory = one page,
always named `index.md`, and the frontmatter is strictly validated — an unknown
or missing field aborts the documentation build.

Internal links are absolute and carry the version:
`/official-plugins/eslint/1/rules/no-then/`.

A push to `master` or `1-dev` triggers the `documentation_deploy` job, which
dispatches `child_repo.workflow.yml` in
[kuzzleio/documentation](https://github.com/kuzzleio/documentation): `master`
deploys to `docs.kuzzle.io`, `1-dev` to `docs-next.kuzzle.io`.

## Commits

Commit messages follow
[Conventional Commits](https://www.conventionalcommits.org) and are validated by
`commitlint` on `commit-msg`. `git commit` with no `-m` opens Commitizen, which
walks you through the format.

The type drives the release:

| Type                                           | Effect     |
| ---------------------------------------------- | ---------- |
| `fix:`                                         | patch      |
| `feat:`                                        | minor      |
| `feat!:` / `BREAKING CHANGE:` footer           | major      |
| `docs:`, `chore:`, `refactor:`, `test:`, `ci:` | no release |

A rule added to a default config, a severity raised from `warn` to `error`, or a
dropped Node.js/ESLint version can break a build that was passing: those are
**breaking changes**, not features.

On `pre-commit`, `lint-staged` runs `prettier --list-different` on staged
Markdown. Run `npx prettier --write .` if it complains.

## Branches and releases

| Branch   | Channel | Published as   |
| -------- | ------- | -------------- |
| `master` | latest  | `1.2.3`        |
| `beta`   | beta    | `1.2.3-beta.1` |
| `1-dev`  | dev     | `1.2.3-dev.1`  |

Open pull requests against `1-dev`.

Releases are automatic: `semantic-release` runs in CI on every push to those
branches, computes the version from the commits, publishes both packages to npm
with trusted publishing, tags the repository and updates
`changelogs/CHANGELOG_<channel>.md`. **Never bump a version by hand.**

### Backmerge after a stable release

The one manual step. A release on `master` lands a `chore(release):` commit and
a tag that exist **only** on `master`. As long as they are not merged back,
`semantic-release` on `1-dev` cannot see them and keeps numbering from the last
prerelease: after `v1.0.1` shipped, `1-dev` produced `v1.0.1-dev.2`, which sorts
_below_ the stable it was supposed to follow, and `npm install @dev` served an
older package than `@latest`.

So, right after a release on `master`:

```sh
git checkout 1-dev
git pull
git merge origin/master
git push origin 1-dev
```

Expect a conflict on the version field of `package.json`, `package-lock.json`
and both `packages/*/package.json`: keep the one from `master`, it is the higher
version. Nothing else should conflict.

This is deliberately not automated — a bot merge that fails on those conflicts
goes unnoticed, and the whole point is that someone checks the numbering is
still coherent.
