import type TSESLint from '@typescript-eslint/utils/ts-eslint';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import baseConfig from './configs/base.js';
import defaultConfig from './configs/default.js';
import typescriptConfig from './configs/typescript.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pj = resolve(__dirname, '..', 'package.json');
const pkg = JSON.parse(readFileSync(pj, 'utf8'));

const plugin: TSESLint.Linter.Plugin = {
  configs: {
    default: defaultConfig,
    base: baseConfig,
    typescript: typescriptConfig,
  },
  meta: {
    name: pkg.name,
    version: pkg.version,
  },
};

export default plugin;
