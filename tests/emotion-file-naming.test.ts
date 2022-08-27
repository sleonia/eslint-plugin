import { RuleTester } from 'eslint'
import EmotionFileNaming, { ERROR_MESSAGE } from '../src/rules/emotion-file-naming'

const tester = new RuleTester({
    parserOptions: {
        parser: '@babel/eslint-parser',
        ecmaVersion: 2021,
        sourceType: 'module'
    }
})

tester.run('emotion-file-naming', EmotionFileNaming, {
    valid: [
        {
            code: '',
            filename: 'valid.js'
        },
        {
            code: `import styled from '@emotion/styled'`,
            filename: 'valid.style.js'
        },
        {
            code: `const HamburgerStyled = styled()`,
            filename: 'valid.style.ts'
        },
        {
            code: `const HamburgerStyled = styled.section()`,
            filename: 'valid.style.ts'
        },
        {
            code: `
                import styled from '@emotion/styled'
                const HamburgerStyled = styled.section()
            `,
            filename: 'valid.style.ts'
        }
    ],
    invalid: [
        {
            code: `import styled from '@emotion/styled'`,
            errors: [{ message: ERROR_MESSAGE }],
            filename: 'invalid.js'
        },
        {
            code: `const HamburgerStyled = styled()`,
            errors: [{ message: ERROR_MESSAGE }],
            filename: 'invalid.ts'
        },
        {
            code: `const HamburgerStyled = styled.section()`,
            errors: [{ message: ERROR_MESSAGE }],
            filename: 'invalid.ts'
        },
        {
            code: `
                import styled from '@emotion/styled'
                const HamburgerStyled = styled.section()
            `,
            errors: [{ message: ERROR_MESSAGE }],
            filename: 'almost.valid.ts'
        }
    ]
})
