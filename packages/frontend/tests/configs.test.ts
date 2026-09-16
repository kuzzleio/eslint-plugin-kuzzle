import { ESLint, Linter } from 'eslint';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import plugin from '../lib/index.js';

const fixture = resolve(dirname(fileURLToPath(import.meta.url)), 'fixture');

/**
 * Lints the fixture with one of the exported configs.
 *
 * A config that references a plugin ESLint cannot load, or a rule that calls an
 * API the installed ESLint no longer exposes, throws here rather than returning
 * results — which is the whole point of these tests. `eslint-plugin-import`
 * crashing the run on ESLint 10 (`sourceCode.getTokenOrCommentBefore is not a
 * function`) went unnoticed because nothing ever ran the configs themselves.
 */
const lint = (config: Linter.Config[], files: string[]) =>
  new ESLint({
    cwd: fixture,
    overrideConfigFile: true,
    overrideConfig: [
      ...config,
      {
        languageOptions: {
          parserOptions: { projectService: true, tsconfigRootDir: fixture },
        },
      },
    ],
  }).lintFiles(files);

const ruleIds = (results: ESLint.LintResult[]) =>
  results.flatMap((result) => result.messages.map((message) => message.ruleId));

describe('configs.base', () => {
  // `configs.base` carries no TypeScript parser, hence the plain `.js` fixture.
  it('sorts imports and bans console statements', async () => {
    const results = await lint(plugin.configs!['base'] as Linter.Config[], ['src/unsorted.js']);

    expect(ruleIds(results)).toEqual(expect.arrayContaining(['import-x/order', 'no-console']));
  });
});

describe('configs.default', () => {
  it('lints a `<script setup lang="ts">` block', async () => {
    const results = await lint(plugin.configs!['default'] as Linter.Config[], ['src/Comp.vue']);
    const reported = ruleIds(results);

    // One from each layer the config composes: eslint-plugin-vue, the import
    // ordering, and the Kuzzle TypeScript rules.
    expect(reported).toEqual(
      expect.arrayContaining([
        'vue/multi-word-component-names',
        'import-x/order',
        '@typescript-eslint/method-signature-style',
      ]),
    );
  });

  it('reports no parsing error on the fixture', async () => {
    const results = await lint(plugin.configs!['default'] as Linter.Config[], ['src/unsorted.ts']);

    expect(results.flatMap((result) => result.messages.filter((m) => m.fatal))).toEqual([]);
  });
});
