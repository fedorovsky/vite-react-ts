# Project conventions

## Naming
- All file names use `kebab-case`, no uppercase letters (`card.tsx`, `card.styled.ts`).
- Component directories are also lowercase (`src/components/card/`).

## Styles
- Use **Linaria** (`@linaria/react`) — zero-runtime CSS-in-JS.
- Extract styles into a separate `*.styled.ts` file next to the component.
- Import styles as a namespace: `import * as Styled from './card.styled'`.
- Use `<Styled.Root>`, `<Styled.Header>`, etc. in markup.
- Exception: the root `App.tsx` keeps its styles inline (no separate `*.styled.ts`).

## Component structure
```
src/components/<name>/
├── <name>.tsx          # component
├── <name>.styled.ts    # styled components (Linaria)
└── index.ts            # re-export: export { Component } from './<name>'
```
