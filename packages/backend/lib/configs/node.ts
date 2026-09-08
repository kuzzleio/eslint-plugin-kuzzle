import { Linter } from 'eslint';
import globals from 'globals';

const nodeConfig: Linter.Config[] = [
  {
    languageOptions: {
      ecmaVersion: 2023,
      globals: {
        ...globals.node,
        ...globals.es2023,
        ...globals.mocha,
      },
      parserOptions: {
        ecmaFeatures: {
          impliedStrict: false,
        },
      },
    },
  },
];

export default nodeConfig;
