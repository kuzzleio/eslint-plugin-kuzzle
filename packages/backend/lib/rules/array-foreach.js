module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'enforce `for..of` loops over `Array.forEach`',
      url: require('../utils/url')(module),
    },
    schema: [],
    messages: {
      preferMessage: 'Prefer for...of instead of Array.forEach',
    },
  },
  create(context) {
    return {
      CallExpression(node) {
        if (node.callee.property && node.callee.property.name === 'forEach') {
          context.report({
            node,
            messageId: 'preferMessage',
          });
        }
      },
    };
  },
};
