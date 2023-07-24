"use strict";

module.exports = {
  root: true,
  plugins: ['prettier'],
  extends: ['eslint:recommended', 'plugin:eslint-plugin/recommended', 'plugin:node/recommended'],
  env: {
    node: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  overrides: [
    {
      files: ['tests/**/*.js'],
      env: { mocha: true },
    },
  ],
};
