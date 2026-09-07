import type TSESLint from '@typescript-eslint/utils/ts-eslint';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import defaultConfig from './configs/default.js';
import nodeConfig from './configs/node.js';
import typescriptConfig from './configs/typescript.js';
import arrayForeach from './rules/array-foreach.js';
import noThen from './rules/no-then.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pj = resolve(__dirname, '..', 'package.json');
const pkg = JSON.parse(readFileSync(pj, 'utf8'));

const plugin: TSESLint.FlatConfig.Plugin = {
  meta: {
    name: pkg.name,
    version: pkg.version,
  },
  rules: {
    'array-foreach': arrayForeach,
    'no-then': noThen,
  },
};

// `default` registers the plugin under the `kuzzle` namespace, so it needs the
// object above to exist first. Assigning the configs after the fact keeps that
// dependency explicit, rather than hiding it behind a getter and a temporal
// dead zone.
plugin.configs = {
  default: defaultConfig(plugin),
  node: nodeConfig,
  typescript: typescriptConfig,
};

export default plugin;
