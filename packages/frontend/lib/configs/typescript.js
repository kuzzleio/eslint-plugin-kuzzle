module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    // ? Optimize Vue parsing (see: https://github.com/vuejs/vue-eslint-parser/issues/104)
    parser: {
      ts: '@typescript-eslint/parser',
      js: '@typescript-eslint/parser',
      '<template>': 'espree',
    },
  },
  extends: [
    '@vue/typescript/recommended',
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
