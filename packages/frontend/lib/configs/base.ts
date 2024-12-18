import type TSESLint from '@typescript-eslint/utils/ts-eslint';
import importOptions from '../utils/importOptions.js';

const baseConfig: TSESLint.ClassicConfig.Config = {
  extends: ['plugin:vue/recommended', '@vue/standard', '@vue/prettier'],
  rules: {
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-debugger': 'error',
    'import/order': ['error', importOptions(['~', '@'])],
  },
};

export default baseConfig;
