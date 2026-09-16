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

`doc/<major>/` holds the pages published at
<https://docs.kuzzle.io/official-plugins/eslint/><major>`/`. One directory = one
page, always named `index.md`, and the frontmatter is strictly validated — an
unknown or missing field aborts the documentation build.

Internal links are absolute and carry the version:
`/official-plugins/eslint/2/rules/no-then/`. A `doc/N/` copied from `doc/N-1/`
still points at the old version — grep for the number before anything else.

A push to any `-stable` or `-dev` branch triggers the `documentation_deploy` job, which
dispatches `child_repo.workflow.yml` in
[kuzzleio/documentation](https://github.com/kuzzleio/documentation): a
`-stable` branch deploys to `docs.kuzzle.io`, a `-dev` one to
`docs-next.kuzzle.io`, and the doc version sent is the major the branch carries.

### A new major means a new doc version

A section only exists if the framework repo knows about it. Releasing 3.0.0
means, in this repo: `doc/3/`, the links inside it, `DOC_BASE` in
`packages/backend/lib/utils/docUrl.ts`, and the `version` in the
`client_payload` of the `documentation_deploy` job. Then, in
[kuzzleio/documentation](https://github.com/kuzzleio/documentation): an entry in
`.repos/repositories.json` and a key in `src/.vuepress/sections.json`.

Miss the framework half and the build reports success while deploying nothing —
`kuzdoc install --repo=eslint-plugin-kuzzle-3` resolves no repo and exits 0.
That is how the v1 pages stayed 404 for two releases while every rule's
`meta.docs.url` pointed at them.

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

One pair of branches per major: a stable one and the prereleases feeding it.

| Branch     | npm dist-tag | Published as    |
| ---------- | ------------ | --------------- |
| `2-stable` | `latest`     | `2.3.4`         |
| `2-dev`    | `dev`        | `2.3.4-dev.1`   |
| `1-stable` | `1.x`        | `1.2.3`         |
| `1-dev`    | `1.x-dev`    | `1.2.3-1-dev.1` |

`2-stable` is the default branch — open pull requests against `2-dev`, or
against `1-dev` for a fix that also has to reach the 1.x line.

`1-stable` is a semantic-release _maintenance_ branch, pinned to `1.x.x`: it can
only ever produce 1.x versions, so a `feat!` landing there is refused rather
than silently released as 2.x.

**Never merge `1-dev` into `1-stable` with a merge commit.** A merge drags the
`chore(release): 1.2.3-1-dev.N` commit, and its tag, into the maintenance
branch's history; semantic-release then tries to add the `1.x` channel to that
prerelease and refuses, because under semver a prerelease never satisfies a
range without one:

```
EINVALIDMAINTENANCEMERGE The release `1.0.2-1-dev.1` on branch `1-stable`
cannot be published as it is out of range.
```

Integrate by moving `1-stable` to the `1-dev` commit _below_ its release
commit — the content is identical, the prerelease tag stays out of the history:

```sh
git push origin <sha of 1-dev~1>:1-stable
```

The same trap does not exist on the current major: `2-stable` is a plain release
branch with no range to satisfy, so `2-dev` merges into it normally.

If the 1.x line ever stops needing prereleases, deleting `1-dev` and landing
fixes straight on `1-stable` removes this footgun entirely.

The prerelease identifiers have to differ — semantic-release rejects two
branches sharing one — hence `dev` for the current major and `1-dev` for the
older one, which is why 1.x prereleases read `1.2.3-1-dev.1`.

Releases are automatic: `semantic-release` runs in CI on every push to those
branches, computes the version from the commits, publishes both packages to npm
with trusted publishing, tags the repository and updates
`changelogs/CHANGELOG_<channel>.md`. **Never bump a version by hand.**

### Backmerge after a stable release

The one manual step, and it applies to **each pair independently**. A release on
`<N>-stable` lands a `chore(release):` commit and a tag that exist only there.
As long as they are not merged back, `semantic-release` on `<N>-dev` cannot see
them and keeps numbering from the last prerelease: after `v1.0.1` shipped,
`1-dev` produced `v1.0.1-dev.2`, which sorts _below_ the stable it was supposed
to follow, and `npm install @dev` served an older package than `@latest`.

So, right after a release on `2-stable`:

```sh
git checkout 2-dev
git pull
git merge origin/2-stable
git push origin 2-dev
```

and the same with `1-stable` → `1-dev` after a 1.x release. Never merge across
majors: `2-stable` into `1-dev` would drag 2.x commits into the maintenance
line.

Expect a conflict on the version field of `package.json`, `package-lock.json`
and both `packages/*/package.json`: keep the one from the stable branch, it is
the higher version. Nothing else should conflict.

This is deliberately not automated — a bot merge that fails on those conflicts
goes unnoticed, and the whole point is that someone checks the numbering is
still coherent.
