import type { Rule } from 'eslint'

export const ERROR_MESSAGE = 'File name must contain `.style.` when you use styled from @emotion'

const STYLED = 'styled'
const EMOTION_IMPORT = `from '@emotion/${STYLED}'`

const rule: Rule.RuleModule = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Make your codebase more structured',
            category: 'Best Practices',
            url: 'https://github.com/sleonia/eslint-plugin/blob/master/docs/emotion-file-naming.md',
            recommended: true
        },
        schema: []
    },
    create: (context) => {
        const isIncludesStyleInFileName = (fileName: string) => fileName.includes('.style.')

        const isIncludesStyledFnCall = (sourceText: string) =>
            sourceText.includes(`${STYLED}(`) ||
            sourceText.includes(`${STYLED}\``) ||
            sourceText.includes(`${STYLED}.`)

        return {
            Program(node) {
                const isInludestyles = isIncludesStyleInFileName(context.getFilename())
                const sourceCode = context.getSourceCode()
                const sourceText = sourceCode.getText()

                const isUsingStyled =
                    sourceText.includes(EMOTION_IMPORT) || isIncludesStyledFnCall(sourceText)

                if (isUsingStyled && !isInludestyles) {
                    context.report({
                        node,
                        message: ERROR_MESSAGE
                    })
                }
            }
        }
    }
}

export default rule
