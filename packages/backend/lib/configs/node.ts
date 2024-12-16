const nodeConfig = {
  rules: {},
  env: {
    node: true,
    es6: true,
    mocha: true,
  },
  parserOptions: {
    ecmaFeatures: {
      impliedStrict: false,
    },
    ecmaVersion: 2018,
  },
};

export default nodeConfig;
