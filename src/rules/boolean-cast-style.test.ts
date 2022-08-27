import { RuleTester } from 'eslint'
import BooleanCastStyleRule, { ERROR_MESSAGE } from './boolean-cast-style'

const tester = new RuleTester({
    parserOptions: { parser: '@babel/eslint-parser', ecmaVersion: 2021, sourceType: 'module' },
})

tester.run('no-lodash-named-imports', BooleanCastStyleRule, {
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
        }
    ]
})
