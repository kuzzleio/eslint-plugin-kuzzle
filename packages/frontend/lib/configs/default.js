const baseConfig = require('./base');
const typescriptConfig = require('./typescript');

module.exports = {
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
