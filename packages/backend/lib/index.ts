import { TSESLint } from '@typescript-eslint/utils';
import defaultConfig from './configs/default.js';
import nodeConfig from './configs/node.js';
import typescriptConfig from './configs/typescript.js';
import arrayForeach from './rules/array-foreach.js';
import noThen from './rules/no-then.js';

import packageJson from '../package.json' with { type: 'json' };

const plugin: TSESLint.FlatConfig.Plugin = {
  configs: {
    get default() {
      return defaultConf;
    },
    node: nodeConfig,
    typescript: typescriptConfig,
  },
  meta: {
    name: packageJson.name,
    version: packageJson.version,
  },
  rules: {
    'array-foreach': arrayForeach,
    'no-then': noThen,
  },
};

const defaultConf = defaultConfig(plugin);

export default plugin;
