import { Rule } from 'eslint';
import docUrl from '../utils/docUrl.js';

const arrayForeach: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'enforce `for..of` loops over `Array.forEach`',
      url: docUrl(import.meta),
    },
    schema: [],
    messages: {
      preferMessage: 'Prefer for...of instead of Array.forEach',
    },
  },
  create(context) {
    return {
      CallExpression(node) {
        // `computed` guards against `obj[forEach](...)`, where `forEach` is a
        // variable that happens to carry that name, not the property read.
        if (
          node.callee.type === 'MemberExpression' &&
          !node.callee.computed &&
          node.callee.property.type === 'Identifier' &&
          node.callee.property.name === 'forEach'
        ) {
          context.report({
            node,
            messageId: 'preferMessage',
          });
        }
      },
    };
  },
};

export default arrayForeach;
