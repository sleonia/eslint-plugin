import type { Rule } from 'eslint'
import type {
    Node,
    Identifier,
    VariableDeclarator,
    BaseNode,
    BaseExpression,
    CallExpression
} from 'estree'

export const ERROR_MESSAGE =
    'Variable name must use `Styled` postfix when you call styled from @emotion'
const STYLED_FN_NAME = 'styled'
const STYLED_VARIABLE_POSTFIX = 'Styled'
const STYLED_VARIABLE_POSTFIX_LENGTH = STYLED_VARIABLE_POSTFIX.length

const rule: Rule.RuleModule = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Make your styled-componets more explicit in code base',
            category: 'Best Practices',
            url: 'https://github.com/sleonia/eslint-plugin/blob/master/docs/emotion-styled-variables-naming.md',
            recommended: true
        },
        fixable: 'code',
        schema: []
    },
    create: (context) => {
        const isIdentifier = (node: BaseNode | BaseExpression | undefined): node is Identifier =>
            node?.type === 'Identifier'

        const isVariableDeclarator = (
            node: BaseNode | BaseExpression
        ): node is VariableDeclarator => node.type === 'VariableDeclarator'

        const isCallExpression = (
            node: BaseNode | BaseExpression | undefined
        ): node is CallExpression => node?.type === 'CallExpression'

        const isFnNameStyled = (node: BaseNode | BaseExpression): boolean =>
            isIdentifier(node) && node.name === STYLED_FN_NAME

        const isNodeStyledVariable = (node: Node): boolean =>
            isVariableDeclarator(node) &&
            isIdentifier(node.id) &&
            node.id.name.slice(-STYLED_VARIABLE_POSTFIX_LENGTH) !== STYLED_VARIABLE_POSTFIX

        return {
            CallExpression(node) {
                if (isFnNameStyled(node.callee) && isNodeStyledVariable(node.parent)) {
                    const id =
                        isVariableDeclarator(node.parent) && isIdentifier(node.parent.id)
                            ? node.parent.id
                            : null

                    if (!id) {
                        return
                    }

                    context.report({
                        node,
                        message: ERROR_MESSAGE,
                        fix(fixer) {
                            const variabeName =
                                id.name.split(STYLED_VARIABLE_POSTFIX).join('') +
                                STYLED_VARIABLE_POSTFIX
                            return [fixer.replaceText(id, variabeName)]
                        }
                    })
                }
            },
            TaggedTemplateExpression(node) {
                if (
                    (isFnNameStyled(node.tag) ||
                        (isCallExpression(node.tag) && isFnNameStyled(node.tag.callee))) &&
                    isNodeStyledVariable(node.parent)
                ) {
                    const id =
                        isVariableDeclarator(node.parent) && isIdentifier(node.parent.id)
                            ? node.parent.id
                            : null

                    if (!id) {
                        return
                    }

                    context.report({
                        node,
                        message: ERROR_MESSAGE,
                        fix(fixer) {
                            const variabeName =
                                id.name.split(STYLED_VARIABLE_POSTFIX).join('') +
                                STYLED_VARIABLE_POSTFIX
                            return [fixer.replaceText(id, variabeName)]
                        }
                    })
                }
            },
            MemberExpression(node) {
                if (isFnNameStyled(node.object) && isNodeStyledVariable(node.parent.parent)) {
                    const id =
                        isVariableDeclarator(node.parent.parent) &&
                        isIdentifier(node.parent.parent.id)
                            ? node.parent.parent.id
                            : null

                    if (!id) {
                        return
                    }
                    context.report({
                        node,
                        message: ERROR_MESSAGE,
                        fix(fixer) {
                            const variabeName =
                                id.name.split(STYLED_VARIABLE_POSTFIX).join('') +
                                STYLED_VARIABLE_POSTFIX
                            return [fixer.replaceText(id, variabeName)]
                        }
                    })
                }
            }
        }
    }
}

export default rule
