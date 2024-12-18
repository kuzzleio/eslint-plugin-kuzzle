import jest from 'eslint-plugin-jest';
import tseslint from 'typescript-eslint';

const typescriptConfig = tseslint.config(
  ...tseslint.configs.recommended,
  tseslint.configs.eslintRecommended,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      // Fix for https://github.com/typescript-eslint/typescript-eslint/issues/2483
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
    },
  },
  {
    files: ['tests/**/*.ts'],
    ...jest.configs['flat/recommended'],
    ...jest.configs['flat/style'],
    rules: {
      'sort-keys': 'off',
    },
  },
);

export default typescriptConfig;
