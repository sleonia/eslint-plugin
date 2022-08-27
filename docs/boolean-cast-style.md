The `!!` expression may confused and be kind of ninja-code for developers.

# Rule Details
Example of **incorrect** code for this rule:
```tsx
// 🙅‍♀️
const IS_GEOLOCATION_SUPPORTED = !!navigator?.geolocation?.getCurrentPosition && false

const isEmpty = Boolean([1, 2, 3].length)
```

Examples of **correct** code for this rule:
```tsx
// 👍
const IS_GEOLOCATION_SUPPORTED = Boolean(navigator?.geolocation?.getCurrentPosition)

const isEmpty = Boolean([1, 2, 3].length)
```
