import type { Rule } from "eslint";
import type { UnaryExpression, Identifier } from 'estree'

export const ERROR_MESSAGE = 'No !! boolean cast operator 🙅'

const rule: Rule.RuleModule = {
    meta: {
        type: "suggestion",
        docs: {
            description: "Make all boolean cast the same",
            category: "Best Practices",
            recommended: true,
        },
        fixable: "code",
        schema: [],
    },
    create: (context) => {
        void context;
        return {
            UnaryExpression(node) {
                const argument = node.argument as UnaryExpression
                if (node.operator === '!' && argument?.operator === '!') {
                    context.report({
                        node,
                        message: ERROR_MESSAGE,
                        fix(fixer: Rule.RuleFixer) {
                            const range = node.range

                            if (!range) {
                                return null
                            }

                            const sourceCode = context.getSourceCode()
                            const identifierName = sourceCode.getText(argument, -1)

                            return [
                                fixer.replaceTextRange(range, `Boolean(${identifierName})`)
                            ]
                        },
                    })
                }
            },
        };
    },
};

export default rule
