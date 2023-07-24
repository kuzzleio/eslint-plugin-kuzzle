module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'enforce using `async/await` syntax over Promises',
      url: require('../utils/url')(module),
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
        if (node.property && node.property.name === 'then') {
          context.report({
            node: node.property,
            messageId: 'thenMessage',
          });
        } else if (node.property && node.property.name === 'catch') {
          context.report({
            node: node.property,
            messageId: 'catchMessage',
          });
        }
      },
    };
  },
};
