import type TSESLint from '@typescript-eslint/utils/ts-eslint';
import prettier from '@vue/eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import pluginVue from 'eslint-plugin-vue';
import importOptions from '../utils/importOptions.js';

/**
 * Rules shared by every Vue project, independently of TypeScript.
 *
 * `prettier` comes last so it wins over the formatting rules the Vue preset
 * turns on.
 */
const baseConfig: TSESLint.FlatConfig.ConfigArray = [
  ...pluginVue.configs['flat/recommended'],
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      'import/order': ['error', importOptions(['~', '@'])],
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
    },
  },
  prettier,
];

export default baseConfig;
