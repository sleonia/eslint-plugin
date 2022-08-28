import { RuleTester } from 'eslint'
import EmotionStyledVariablesNamingTest, { ERROR_MESSAGE } from '../src/rules/emotion-styled-variables-naming'

const tester = new RuleTester({
    parserOptions: {
        parser: '@babel/eslint-parser',
        ecmaVersion: 2021,
        sourceType: 'module'
    }
})

const valid = {
    simpleStyled: {
        code: 'const HamburgerStyled = styled()'
    },

    styledWithMember: {
        code: 'const HamburgerStyled = styled.section()'
    }
}

tester.run('emotion-styled-variables-naming', EmotionStyledVariablesNamingTest, {
    valid: [valid.simpleStyled, valid.styledWithMember],
    invalid: [
        {
            code: 'const Hamburger = styled()',
            errors: [{ message: ERROR_MESSAGE }],
            output: valid.simpleStyled.code
        },
        {
            code: 'const StyledHamburger = styled()',
            errors: [{ message: ERROR_MESSAGE }],
            output: valid.simpleStyled.code
        },
        {
            code: 'const StyledHamburger = styled``',
            errors: [{ message: ERROR_MESSAGE }],
            output: 'const HamburgerStyled = styled``'
        },
        {
            code: 'const StyledHamburger = styled.section()',
            errors: [{ message: ERROR_MESSAGE }],
            output: valid.styledWithMember.code
        },
        {
            code: 'const StyledHamburger = styled.section``',
            errors: [{ message: ERROR_MESSAGE }],
            output: 'const HamburgerStyled = styled.section``'
        }
    ]
})
