import { RuleTester } from 'eslint'
import EmotionStyledVariablesNamingTest, { ERROR_MESSAGE } from '../src/rules/emotion-styled-variables-naming'

const tester = new RuleTester({
    parserOptions: {
        parser: '@babel/eslint-parser',
        ecmaVersion: 2021,
        sourceType: 'module'
    }
})

const valid = [
    {
        code: 'const HamburgerStyled = styled()'
    },
    {
        code: 'const HamburgerStyled = styled.section()'
    },
    {
        code: 'const HamburgerStyled = styled.section``'
    },
    {
        code: 'const HamburgerStyled = styled(Container)``'
    }
]

tester.run('emotion-styled-variables-naming', EmotionStyledVariablesNamingTest, {
    valid,
    invalid: [
        {
            code: 'const Hamburger = styled()',
            errors: [{ message: ERROR_MESSAGE }],
            output: valid[0].code
        },
        {
            code: 'const StyledHamburger = styled()',
            errors: [{ message: ERROR_MESSAGE }],
            output: valid[0].code
        },
        {
            code: 'const StyledHamburger = styled``',
            errors: [{ message: ERROR_MESSAGE }],
            output: 'const HamburgerStyled = styled``'
        },
        {
            code: 'const StyledHamburger = styled.section()',
            errors: [{ message: ERROR_MESSAGE }],
            output: valid[1].code
        },
        {
            code: 'const StyledHamburger = styled.section``',
            errors: [{ message: ERROR_MESSAGE }],
            output: valid[2].code
        },
        {
            code: 'const StyledHamburger = styled(Container)``',
            errors: [{ message: ERROR_MESSAGE }],
            output: valid[3].code
        }
    ]
})
