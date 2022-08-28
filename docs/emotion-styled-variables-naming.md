The `Styled` postfix in your styled-component (emotion) variable make reading easer

# Rule Details
Example of **incorrect** code for this rule:
```tsx
// 🙅‍♀️
const SomeFlexWrapper = styled.div`
    display: flex;
`
```

Examples of **correct** code for this rule:
```tsx
// 👍
const SomeFlexWrapperStyled = styled.div`
    display: flex;
`
```
