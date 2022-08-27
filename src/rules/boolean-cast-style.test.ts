import { RuleTester } from 'eslint'
import BooleanCastStyleRule, { ERROR_MESSAGE } from './boolean-cast-style'

const tester = new RuleTester({
    parserOptions: { parser: '@babel/eslint-parser', ecmaVersion: 2021, sourceType: 'module' },
})

tester.run('boolean-cast-style', BooleanCastStyleRule, {
    valid: [
        {
            code: 'Boolean(a)'
        }
    ],
    invalid: [
        {
            code: '!!a',
            errors: [{ message: ERROR_MESSAGE }],
            output: 'Boolean(a)'
        },
        {
            code: '! !a',
            errors: [{ message: ERROR_MESSAGE }],
            output: 'Boolean(a)'
        },
        {
            code: '! (! a)',
            errors: [{ message: ERROR_MESSAGE }],
            output: 'Boolean( a)'
        },
        {
            code: '!!(a)',
            errors: [{ message: ERROR_MESSAGE }],
            output: 'Boolean((a))' // ℹ️ We don't remove your parentheses or format your code. Another rules can make it
        },
        {
            code: 'const b = !!a;',
            errors: [{ message: ERROR_MESSAGE }],
            output: 'const b = Boolean(a);'
        },
        {
            code: 'const b = !!(a);',
            errors: [{ message: ERROR_MESSAGE }],
            output: 'const b = Boolean((a));'
        },
        {
            code: 'String(!!(open && index === Number(someIndex)))',
            errors: [{ message: ERROR_MESSAGE }],
            output: 'String(Boolean((open && index === Number(someIndex))))'
        }
    ]
})
