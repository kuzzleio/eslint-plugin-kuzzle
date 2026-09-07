import type TSESLint from '@typescript-eslint/utils/ts-eslint';

/**
 * TypeScript rules, applied to Vue SFCs as well as plain `.ts` files.
 *
 * The parser is not set here: `@vue/eslint-config-typescript` already wires
 * `vue-eslint-parser` with `@typescript-eslint/parser` for the script blocks,
 * which is what `configs.default` composes below.
 */
const typescriptConfig: TSESLint.FlatConfig.ConfigArray = [
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
    rules: {
      /**
       * Force consistent type imports
       *
       * @see https://typescript-eslint.io/blog/consistent-type-imports-and-exports-why-and-how/
       */
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          disallowTypeAnnotations: true,
          fixStyle: 'inline-type-imports',
          prefer: 'type-imports',
        },
      ],
      // Normalize method signature style
      '@typescript-eslint/method-signature-style': 'error',
      '@typescript-eslint/no-import-type-side-effects': 'error',
      // Normalize eqeqeq rules in template like in script
      'vue/eqeqeq': ['error', 'always'],
      // Force self-closing to improve readability of templates
      'vue/html-self-closing': [
        'error',
        {
          html: {
            component: 'always',
            normal: 'always',
            void: 'any',
          },
          math: 'always',
          svg: 'always',
        },
      ],
    },
  },
];

export default typescriptConfig;
