import tseslint from 'typescript-eslint';

const typescriptConfig = tseslint.config(
  ...tseslint.configs.recommended,
  tseslint.configs.eslintRecommended,
  {
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      // Fix for https://github.com/typescript-eslint/typescript-eslint/issues/2483
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
    },
  },
);

export default typescriptConfig;
