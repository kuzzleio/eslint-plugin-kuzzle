import eslint from '@eslint/js';
import eslintPlugin from 'eslint-plugin-eslint-plugin';
import nodePlugin from 'eslint-plugin-n';
import prettierPluginRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  nodePlugin.configs['flat/recommended'],
  eslintPlugin.configs['flat/recommended'],
  {
    rules: {
      'n/file-extension-in-import': ['error', 'always'],
      'n/no-unpublished-import': [
        'error',
        {
          ignoreTypeImport: true,
        },
      ],
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.nodeBuiltin,
        ...globals.es2023,
      },
    },
  },
  {
    files: ['tests/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.mocha,
      },
    },
  },
  {
    // The fixture is deliberately unsorted and its imports are never installed:
    // it is input for the config tests, not source code.
    ignores: ['**/dist/', '**/tests/fixture/'],
  },
  prettierPluginRecommended,
);
