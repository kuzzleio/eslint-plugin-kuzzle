import defaultConfig from './configs/default.js';
import nodeConfig from './configs/node.js';
import typescriptConfig from './configs/typescript.js';
import arrayForeach from './rules/array-foreach.js';
import noThen from './rules/no-then.js';

export const rules = {
  'array-foreach': arrayForeach,
  'no-then': noThen,
};

export const configs = {
  default: defaultConfig,
  node: nodeConfig,
  typescript: typescriptConfig,
};
