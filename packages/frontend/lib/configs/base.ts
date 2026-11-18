import js from '@eslint/js';
import type TSESLint from '@typescript-eslint/utils/ts-eslint';
import prettier from '@vue/eslint-config-prettier';
import importPlugin from 'eslint-plugin-import-x';
import pluginVue from 'eslint-plugin-vue';
import importOptions from '../utils/importOptions.js';

/**
 * Rules shared by every Vue project, independently of TypeScript.
 *
 * `js.configs.recommended` comes first, as in the backend configs: it is the
 * ESLint core baseline (`no-dupe-keys`, `no-unreachable`, `valid-typeof`…)
 * that `standard-with-typescript` used to bring in 0.x. The TypeScript layer
 * turns off the core rules that conflict with TypeScript (`no-undef`…).
 *
 * `prettier` comes last so it wins over the formatting rules the Vue preset
 * turns on.
 */
const baseConfig: TSESLint.FlatConfig.ConfigArray = [
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    plugins: {
      'import-x': importPlugin,
    },
    rules: {
      'import-x/order': ['error', importOptions(['~', '@'])],
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
    },
  },
  prettier,
];

export default baseConfig;
