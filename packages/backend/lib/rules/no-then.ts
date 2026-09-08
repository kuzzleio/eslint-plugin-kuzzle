import { Rule } from 'eslint';
import docUrl from '../utils/docUrl.js';

const noThen: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'enforce using `async/await` syntax over Promises',
      url: docUrl(import.meta),
    },
    schema: [],
    messages: {
      thenMessage: 'Prefer async/await to Promise.then()',
      catchMessage: 'Prefer async/await to Promise.catch()',
    },
  },

  create(context) {
    return {
      MemberExpression(node) {
        if (node.property.type === 'Identifier' && node.property.name === 'then') {
          context.report({
            node: node.property,
            messageId: 'thenMessage',
          });
        } else if (node.property.type === 'Identifier' && node.property.name === 'catch') {
          context.report({
            node: node.property,
            messageId: 'catchMessage',
          });
        }
      },
    };
  },
};

export default noThen;
