module.exports = {
  rules: {
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/ban-ts-comment": 0,
    "@typescript-eslint/type-annotation-spacing": 1,
    "@typescript-eslint/member-delimiter-style": 1,
    // Fix for https://github.com/typescript-eslint/typescript-eslint/issues/2483
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": "error"
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
};
