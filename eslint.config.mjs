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
  // eslint-plugin-eslint-plugin 7 dropped the `flat/` prefixed configs: the
  // flat config is the only one left, so it took the unprefixed name.
  eslintPlugin.configs.recommended,
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
    ignores: ['**/dist/'],
  },
  prettierPluginRecommended,
);
