## [1.0.0-dev.3](https://github.com/kuzzleio/eslint-plugin-kuzzle/compare/v1.0.0-dev.2...v1.0.0-dev.3) (2026-09-08)

### Features

* **deps:** widen the typescript peer range to <6.1.0 ([d8acc4d](https://github.com/kuzzleio/eslint-plugin-kuzzle/commit/d8acc4dd63fa0b62303655f12899838e7552d675))

## [1.0.0-dev.2](https://github.com/kuzzleio/eslint-plugin-kuzzle/compare/v1.0.0-dev.1...v1.0.0-dev.2) (2026-09-08)

### Bug Fixes

* **ci:** stop pinning npm 9, which cannot publish under trusted publishing ([6c5a76f](https://github.com/kuzzleio/eslint-plugin-kuzzle/commit/6c5a76f005ee091e1f3d50620abb8787114ed41d))

## 1.0.0-dev.1 (2026-09-08)

### ⚠ BREAKING CHANGES

* **frontend:** requires eslint >= 9.10 and a flat `eslint.config.mjs`;
`.eslintrc` and the `plugin:vue-kuzzle/*` selectors no longer work. The
`./importOption` subpath export is renamed to `./importOptions`. See the
migration section of packages/frontend/README.md.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
* **backend:** requires eslint >= 9.10 and a flat `eslint.config.mjs`;
`.eslintrc` and the `plugin:kuzzle/*` selectors no longer work. Consumers
must drop `@typescript-eslint/eslint-plugin` and `@typescript-eslint/parser`.
See the migration section of packages/backend/README.md.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>

### Features

* add eslint jest plugin for tests ([96b1ee8](https://github.com/kuzzleio/eslint-plugin-kuzzle/commit/96b1ee865b6d32e618a8c644b72616f0aa3fe22e))
* add Vue.js config package ([2a072a5](https://github.com/kuzzleio/eslint-plugin-kuzzle/commit/2a072a51c8c91ef25d80f15f7633222d5858ff36))
* **backend:** eslint 9 and 10 support ([ce90c33](https://github.com/kuzzleio/eslint-plugin-kuzzle/commit/ce90c333e31179353b3867fcd6c0bf41e4b3fd8e))
* **frontend:** convert frontend package to ts ([c15f47b](https://github.com/kuzzleio/eslint-plugin-kuzzle/commit/c15f47ba966d89fdf14efd9da30a47dac5c19a83))
* **frontend:** migrate to flat config and fix the package entry points ([9505408](https://github.com/kuzzleio/eslint-plugin-kuzzle/commit/95054086bd79a4b1c8050ddcd825938c4cf6dc58))
* **typescript:** add project configuration ([3992e17](https://github.com/kuzzleio/eslint-plugin-kuzzle/commit/3992e173301494713b98ee3eec99cd4406094cb0))
* update typescript ([468deea](https://github.com/kuzzleio/eslint-plugin-kuzzle/commit/468deea45b587effebd5a77cec46f1f95d685984))

### Bug Fixes

* **backend:** actually fix the issue and stop going down the wrong rabbit hole ([9821e94](https://github.com/kuzzleio/eslint-plugin-kuzzle/commit/9821e946564fae33c5747962c4d47530f57ec270))
* **backend:** add missing eslint-config-prettier dep ([203a452](https://github.com/kuzzleio/eslint-plugin-kuzzle/commit/203a452ba1d94b65fc7c1473080a4079ea27e962))
* **backend:** correct keyword for warning rules ([370feb6](https://github.com/kuzzleio/eslint-plugin-kuzzle/commit/370feb68da9fdec618e71184e93e7aa8fe18bd35))
* **backend:** fix wrong plugin name, fix node config not an array ([6499c63](https://github.com/kuzzleio/eslint-plugin-kuzzle/commit/6499c631ac1039ef13de3ccfa1c5f76c26ec1338))
* **backend:** more workarounds ([7f0a981](https://github.com/kuzzleio/eslint-plugin-kuzzle/commit/7f0a981049c238bc8bd19252181c19c7e1dddf1d))
* **backend:** work around eslint-config-prettier referring to removed rules ([df1caa1](https://github.com/kuzzleio/eslint-plugin-kuzzle/commit/df1caa1a97e1a83194eed2e9db1989e0c07ebfc6))
* **ci:** support npm trusted publishing in the release process ([4d3ccb6](https://github.com/kuzzleio/eslint-plugin-kuzzle/commit/4d3ccb678632fea0a5f9d04fb4d97f0dcbcf9344))
* **docurl:** fix import.meta.filename missing in node 18 ([7bb0e45](https://github.com/kuzzleio/eslint-plugin-kuzzle/commit/7bb0e45723e1b8e2824b03849cb069456b41a920))
* **frontend:** remove extraneous tests npm script ([2c1dee5](https://github.com/kuzzleio/eslint-plugin-kuzzle/commit/2c1dee5698b9d94da28f6fa34121dc9e59de0cf1))
