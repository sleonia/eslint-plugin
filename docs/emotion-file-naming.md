The `style` in your file name when you use styled-component (emotion) make easer navigation in your code base.

# Rule Details
Example of **incorrect** code for this rule:
```tsx
// 🙅‍♀️
// wrapper.js
const WrapperStyled = styled.div`
    display: flex;
`
```

Examples of **correct** code for this rule:
```tsx
// 👍
// wrapper.style.js
const WrapperStyled = styled.div`
    display: flex;
`
```
