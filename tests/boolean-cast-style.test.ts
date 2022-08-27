import { RuleTester } from 'eslint'
import BooleanCastStyleRule, { ERROR_MESSAGE } from '../src/rules/boolean-cast-style'

const tester = new RuleTester({
    parserOptions: {
        parser: '@babel/eslint-parser',
        ecmaVersion: 2021,
        sourceType: 'module'
    }
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
            output: 'Boolean((a))'
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
        },
        {
            code: 'if (!!a) {}',
            errors: [{ message: ERROR_MESSAGE }],
            output: 'if (Boolean(a)) {}'
        },
        {
            code: '!!navigator?.vibrate',
            errors: [{ message: ERROR_MESSAGE }],
            output: 'Boolean(navigator?.vibrate)'
        },
        {
            code: '!![1, 2, 3].length',
            errors: [{ message: ERROR_MESSAGE }],
            output: 'Boolean([1, 2, 3].length)'
        },
        {
            code: '!!!a',
            errors: [{ message: ERROR_MESSAGE }],
            output: '!Boolean(a)'
        }
    ]
})
