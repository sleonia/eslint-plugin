The `!!` expression may confused and be kind of ninja-code for developers.

# Rule Details
Example of **incorrect** code for this rule:
```tsx
// 🙅‍♀️
const IS_VIBRATE_SUPPORTED = !!navigator?.vibrate

const isEmpty = Boolean([1, 2, 3].length)
```

Examples of **correct** code for this rule:
```tsx
// 👍
const IS_VIBRATE_SUPPORTED = Boolean(navigator?.vibrate)

const isEmpty = Boolean([1, 2, 3].length)
```
