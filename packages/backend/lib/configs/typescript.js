module.exports = {
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['**/tsconfig.json', '**/tsconfig.*.json'],
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/type-annotation-spacing': 'warn',
    '@typescript-eslint/member-delimiter-style': 'warn',
    // Fix for https://github.com/typescript-eslint/typescript-eslint/issues/2483
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
  },
};
