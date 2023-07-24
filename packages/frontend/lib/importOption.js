// ? Eslint plugin rules are not applicable for this function, because it's not a code of eslint rule
/* eslint-disable eslint-plugin/prefer-message-ids, eslint-plugin/prefer-object-rule, eslint-plugin/require-meta-type, eslint-plugin/require-meta-schema */
module.exports = (alias) => {
  const aliases = Array.isArray(alias) ? alias : [alias];

  return {
    groups: ['builtin', 'external', 'parent', 'sibling'],
    pathGroups: [
      { pattern: 'vue', group: 'external', position: 'before' },
      // ? Patterns should be sorting of more precise to more generic
      ...aliases.map((alias) => ({ pattern: `${alias}/**/*.vue`, group: 'sibling' })),
      { pattern: './**/*.vue', group: 'sibling', position: 'after' },
      ...aliases.map((alias) => ({ pattern: `${alias}/**/*`, group: 'parent' })),
      { pattern: './**/*', group: 'parent', position: 'after' },
    ],
    /**
     * ? Particular case: need to exclude `vue` of external import group to can be sorted with pattern
     * @see https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md#pathgroupsexcludedimporttypes-array
     */
    pathGroupsExcludedImportTypes: ['vue'],
    'newlines-between': 'always',
    distinctGroup: false,
    alphabetize: {
      order: 'asc',
    },
  };
};
