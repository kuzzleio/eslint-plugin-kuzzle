import js from '@eslint/js';
import type TSESLint from '@typescript-eslint/utils/ts-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

const defaultConfig = (plugin: TSESLint.FlatConfig.Plugin): TSESLint.FlatConfig.Config[] => [
  js.configs.recommended,
  {
    plugins: {
      kuzzle: plugin,
    },
    rules: {
      'consistent-return': 'off',
      curly: 'error',
      'dot-notation': 'error',
      eqeqeq: 'error',
      'func-names': ['error', 'always'],
      'guard-for-in': 'error',
      'new-cap': 'warn',
      'no-caller': 'error',
      'no-console': 'error',
      'no-else-return': 'error',
      'no-eval': 'error',
      'no-extend-native': 'error',
      'no-extra-bind': 'error',
      'no-global-assign': 'error',
      'no-implicit-coercion': 'error',
      'no-implied-eval': 'error',
      'no-invalid-this': 'error',
      'no-irregular-whitespace': 'error',
      'no-labels': 'error',
      'no-lone-blocks': 'error',
      'no-lonely-if': 'warn',
      'no-loop-func': 'error',
      'no-nested-ternary': 'error',
      'no-new': 'error',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-return-assign': 'error',
      'no-self-compare': 'error',
      'no-sequences': 'error',
      'no-shadow': 'error',
      'no-shadow-restricted-names': 'error',
      'no-throw-literal': 'error',
      'no-undef': 'error',
      'no-undef-init': 'warn',
      'no-unreachable': 'error',
      'no-unused-expressions': ['error', { allowShortCircuit: true }],
      'no-useless-call': 'error',
      'no-with': 'error',
      'require-atomic-updates': 'off',
      'sort-keys': ['warn', 'asc'],
      strict: ['error', 'global'],
      'vars-on-top': 'error',
      yoda: ['error', 'never'],

      // Plugins custom rules
      'kuzzle/array-foreach': 'warn',
      'prettier/prettier': 'error',
    },
  },
  eslintPluginPrettierRecommended,
];

export default defaultConfig;
