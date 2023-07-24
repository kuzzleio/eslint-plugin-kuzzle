module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  extends: [
    '@vue/typescript/recommended',
    '@vue/eslint-config-standard-with-typescript',
    // Need to repeat prettier here to keep rules priority over previous rulesset
    '@vue/prettier',
  ],
  rules: {
    // Normalize eqeqeq rules in template like in script
    'vue/eqeqeq': ['error', 'always'],
    // Force self-closing to improve readability of templates
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'any',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
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
    '@typescript-eslint/no-import-type-side-effects': 'error',
    // Normalize methode signature style
    '@typescript-eslint/method-signature-style': 'error',
  },
};
