// eslint-disable-next-line
const badWords = ["toto", "tata", "tutu", "foo", "bar", "baz"];

// eslint-disable-next-line
const anyThings = ["anything", "whatever"];

function create(context) {
  return {
    Identifier(node) {
      const { name: nodeName } = node;
      const bad = badWords.includes(nodeName);
      if (bad) {
        context.report({
          node,
          message: "No unclear names",
          fix(fixer) {
            return [fixer.replaceTextRange([node.start, node.end], "anything")];
          },
        });
      }
    },
    Literal(node) {
      const { value: nodeValue } = node;
      if (!nodeValue) return;
      if (typeof nodeValue !== "string") return;
      const bad = badWords.includes(nodeValue);
      if (bad) {
        context.report({
          node,
          message: "No unclear names",
          fix(fixer) {
            return [
              fixer.replaceTextRange([node.start, node.end], '"anything"'),
            ];
          },
        });
      }
    },
  };
}

// eslint-disable-next-line no-undef
module.exports = {
  rules: {
    "no-foo": {
      meta: {
        type: "problem",
        hasSuggestions: true,
        fixable: "code",
      },
      create,
    },
  },
};
