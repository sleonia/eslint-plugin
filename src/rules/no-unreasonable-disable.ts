import type { Rule } from 'eslint'

const SYMBOLS_COUNT = 5

// TODO constant to regexp
const reasonDisableRegExp = /^ ?reason: .{ 5,}/
const eslintDisableRegExp = /^ ?eslint-disable[\w\d-]* .+$/

const getWarningMessage = (
    value: string
): string => `Inline-config "${value.trim()}" without a reason for disable,
    Example of correct usage:
    /* reason: ${SYMBOLS_COUNT}+ symbols */
    /* ${value.trim()} */`

const rule: Rule.RuleModule = {
    meta: {
        type: 'problem',
        docs: {
            // TODO
            description: '',
            category: 'Best Practices',
            // TODO
            url: '',
            recommended: true
        },
        schema: []
    },

    create: (context) => {
        const sourceCode = context.getSourceCode()

        return {
            Program(node) {
                const comments = sourceCode.getAllComments()

                comments.forEach((comment, index, comments) => {
                    const isRuleDisabled = eslintDisableRegExp.test(comment.value)

                    if (isRuleDisabled) {
                        const previousComment = comments[index - 1]

                        let ruleReasonCommented = false

                        if (
                            previousComment &&
                            typeof previousComment?.loc?.end?.line === 'number' &&
                            typeof comment?.loc?.start.line === 'number' &&
                            previousComment?.loc?.end?.line + 1 === comment.loc.start.line
                        ) {
                            ruleReasonCommented = reasonDisableRegExp.test(previousComment.value)
                        }

                        if (!ruleReasonCommented) {
                            context.report({
                                node,
                                message: getWarningMessage(comment.value)
                            })
                        }
                    }
                })
                // comments.filter((token) => token.type !== 'Shebang').forEach(checkComment)
            }
        }
    }
}

export default rule
