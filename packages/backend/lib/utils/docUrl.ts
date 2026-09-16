import { basename, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Root of the published rule documentation.
 *
 * The major here is the *documentation* version registered in
 * `kuzzleio/documentation` (`.repos/repositories.json`, `sections.json`), which
 * tracks the major of this package. Bumping the package to 3.x means creating
 * `doc/3/` and registering it, then bumping this constant.
 *
 * It deliberately does not point at a GitHub blob URL pinned to the release
 * tag: that only resolves once the tag exists, so every rule URL is broken on
 * an unreleased branch.
 */
const DOC_BASE = 'https://docs.kuzzle.io/official-plugins/eslint/2/rules';

/**
 * Builds the `meta.docs.url` of a rule from the module that defines it.
 *
 * `docUrl(import.meta)` in `lib/rules/no-then.ts` returns
 * `https://docs.kuzzle.io/official-plugins/eslint/2/rules/no-then/`.
 */
const docUrl = (meta: ImportMeta) => {
  const filename = meta.filename ?? fileURLToPath(meta.url);
  const rule = basename(filename, extname(filename));

  return `${DOC_BASE}/${rule}/`;
};

export default docUrl;
