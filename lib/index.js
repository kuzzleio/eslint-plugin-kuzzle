module.exports = {
  rules: {
    'array-foreach': require('./rules/array-foreach'),
    'no-then': require('./rules/no-then'),
  },
  configs: {
    default: require('./configs/default'),
  }
};
