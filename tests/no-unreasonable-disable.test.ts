import { RuleTester } from 'eslint'
import NoUnreasonableDisableTest from '../src/rules/no-unreasonable-disable'

const tester = new RuleTester({
    parserOptions: {
        parser: '@babel/eslint-parser',
        ecmaVersion: 2021,
        sourceType: 'module'
    }
})

const valid = [
    {
        code: `
        /* reason: bla-bla-bla */
        /* eslint-disable */
        const a = 42
        `
    },
    {
        code: `
        // reason: bla-bla-bla
        // eslint-disable no-console, no-control-regex
        const a = 42
        `
    },
    {
        code: `
        // reason: bla-bla-bla
        // eslint-disable-line
        const a = 42
        `
    },
    {
        code: `
        /* reason: bla-bla-bla */
        /* eslint-disable-line no-console, no-control-regex */
        const a = 42
        `
    },
    {
        code: '#!/usr/bin/node'
    }
]

tester.run('no-unreasonable-disable', NoUnreasonableDisableTest, {
    valid,
    invalid: [
        // {
        //     code: `/* eslint-disable */            `
        // }
    ]
})
