# `eslint-plugin-sleonia`

![github actions](https://github.com/sleonia/eslint-plugin/actions/workflows/push-check.yml/badge.svg)
[![npm version](https://img.shields.io/npm/v/eslint-plugin-sleonia.svg?style=flat-square)](https://www.npmjs.com/package/eslint-plugin-sleonia)

## How to install

```bash
npm i --save-dev eslint-plugin-sleonia
```

## How to use

```js
// .eslintrc.js
plugins: ['sleonia'],
rules: {
    'sleonia/boolean-cast-style': 'error',
    'sleonia/emotion-file-naming': 'error',
    'sleonia/emotion-styled-variables-naming': 'error',
}
```
