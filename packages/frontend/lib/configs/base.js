const importOptions = require('../importOption');

module.exports = {
  extends: ['plugin:vue/recommended', '@vue/standard', '@vue/prettier'],
  rules: {
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-debugger': 'error',
    'import/order': ['error', importOptions(['~', '@'])],
    'prefer-arrow-callback': 'error',
    'arrow-body-style': ['error', 'as-needed'],
  },
};
