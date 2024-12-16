import { Linter } from 'eslint';
import globals from 'globals';

const nodeConfig: Linter.Config = {
  languageOptions: {
    ecmaVersion: 2018,
    globals: {
      ...globals.node,
      ...globals.es2018,
      ...globals.mocha,
    },
    parserOptions: {
      ecmaFeatures: {
        impliedStrict: false,
      },
    },
  },
};

export default nodeConfig;
