import type TSESLint from '@typescript-eslint/utils/ts-eslint';
import baseConfig from './configs/base.js';
import defaultConfig from './configs/default.js';
import typescriptConfig from './configs/typescript.js';

import packageJson from '../package.json' with { type: 'json' };

const plugin: TSESLint.Linter.Plugin = {
  configs: {
    default: defaultConfig,
    base: baseConfig,
    typescript: typescriptConfig,
  },
  meta: {
    name: packageJson.name,
    version: packageJson.version,
  },
};

export default plugin;
