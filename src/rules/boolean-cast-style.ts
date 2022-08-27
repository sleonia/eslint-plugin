import type { Rule } from 'eslint'
import type { BaseNodeWithoutComments, UnaryExpression } from 'estree'

export const ERROR_MESSAGE = 'No !! boolean cast operator 🙅'

const wrapToExpression = (text: string): string => `Boolean(${text})`

const isChildUnaryExpression = (
    node: BaseNodeWithoutComments
): node is UnaryExpression => node.type === 'UnaryExpression'

const rule: Rule.RuleModule = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Make all boolean cast simple',
            category: 'Best Practices',
            url: 'https://github.com/sleonia/boolean-cast-style',
            recommended: true
        },
        fixable: 'code',
        schema: []
    },
    create: (context) => {
        return {
            UnaryExpression(node) {
                if (
                    node.operator === '!' &&
                    isChildUnaryExpression(node.argument) &&
                    node.argument.operator === '!' &&
                    /** for multiple LOGICAL NOT case: !!!!!a */
                    !isChildUnaryExpression(node.argument.argument)
                ) {
                    context.report({
                        node,
                        message: ERROR_MESSAGE,
                        fix(fixer: Rule.RuleFixer) {
                            const range = node.range

                            if (!range) {
                                return null
                            }

                            const sourceCode = context.getSourceCode()
                            const identifierName = sourceCode.getText(
                                node.argument,
                                -1
                            )

                            const newText = wrapToExpression(identifierName)
                            return [fixer.replaceTextRange(range, newText)]
                        }
                    })
                }
            }
        }
    }
}

export default rule
