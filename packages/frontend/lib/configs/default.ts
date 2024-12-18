import type TSESLint from '@typescript-eslint/utils/ts-eslint';
import baseConfig from './base.js';
import typescriptConfig from './typescript.js';

const defaultConfig: TSESLint.ClassicConfig.Config = {
  ...baseConfig,
  overrides: [
    {
      files: ['vite.config.ts'],
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
    {
      files: ['tests/**/*.ts'],
      extends: ['plugin:jest/recommended', 'plugin:jest/style'],
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
    {
      // Apply vue and typescript rules only on Vue SFC and typescript files
      files: ['src/**/*.{vue,ts}'],
      ...typescriptConfig,
    },
  ],
};

export default defaultConfig;
