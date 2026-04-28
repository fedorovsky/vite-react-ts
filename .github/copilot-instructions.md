# Copilot Instructions

## Stack

- React 19 + TypeScript (strict mode)
- Vite
- styled-components (no `css` helper)

---

## Component structure

Each component lives in its own folder:

```
component-name/
  index.ts                    # re-export everything public
  component-name.tsx          # component logic
  component-name.styled.ts    # styled-components styles
  component-name.context.ts   # (if context is needed)
```

### File naming

- **kebab-case** for all files: `item-indicator.tsx`, `root.context.ts`
- Context files: `*.context.ts`
- Style files: `*.styled.ts`
- No folder prefix inside the folder: inside `item/` use `item.tsx`, not `select-item.tsx`

### Export naming inside folders

- No `Select` prefix: `Root`, `Trigger`, `Item` — not `SelectRoot`, `SelectTrigger`
- Public API via folder `index.ts` and `src/select/index.ts` (namespace `Select.*`)

---

## Public API entry points

Every compound component (e.g. `select`) has **two** entry-point files at the root of its folder:

### `index.parts.ts` — flat named exports

Re-exports every public part by name, without a namespace:

```ts
// index.parts.ts
export { Root } from './root';
export { Trigger } from './trigger';
export { Value } from './value';
// ...
```

### `index.ts` — namespace + types

Re-exports the parts as a namespace and re-exports all public types:

```ts
// index.ts
export * as Select from './index.parts';

export type * from './root';
export type * from './trigger';
export type * from './value';
// ...
```

This gives consumers two import styles:

```tsx
// namespace
import { Select } from './select';
<Select.Root> ... </Select.Root>

// flat (tree-shakeable)
import { Root, Trigger } from './select/index.parts';
```

---

## Components

### Simple components — plain function

If a component doesn't need an external `ref`, use a plain function:

```tsx
export function Value(props: ValueProps) {
  return <Styled.Value>{...}</Styled.Value>;
}
```

### Components with ref — forwardRef

Only when `ref` is genuinely needed from outside:

```tsx
export const Trigger = React.forwardRef<HTMLButtonElement, TriggerProps>(
  function Trigger(props, forwardedRef) { ... }
);
```

### React.memo

Use only where justified (e.g. `Item` in a list).

---

## Styled-components

### Styles in a separate file

```ts
// trigger.styled.ts
import styled from 'styled-components';

export const Trigger = styled.button<{ $open?: boolean }>`
  border: 1px solid ${({ $open }) => ($open ? '#3b82f6' : '#ccc')};
`;
```

### Import as namespace

```tsx
import * as Styled from './trigger.styled';
// usage:
<Styled.Trigger $open={open} />
```

### Rules

- **Never use the `css` helper** from styled-components
- Pass state via **`$`-props** (transient props), not via `data-*` attributes
- Conditional styles inline in the property via a function: `color: ${({ $disabled }) => $disabled ? '#999' : '#000'};`
- Do not import `{ css }`
- **`$`-props must come first** in JSX, before `ref`, event handlers, and other props:

```tsx
// ✅
<Styled.Trigger $open={open} ref={triggerRef} onClick={handleClick} {...rest} />

// ❌
<Styled.Trigger ref={triggerRef} onClick={handleClick} $open={open} {...rest} />
```

---

## Context

### Context file structure

```ts
// root.context.ts
export interface RootContext { ... }
export const RootContext = React.createContext<RootContext | null>(null);
export function useRootContext(): RootContext { ... }
```

- The interface and the React context object can share the same name
- The hook throws if the context is missing

### Types in context

- Use `unknown` instead of `any`
- Use `RefObject` instead of `MutableRefObject`

---

## React imports

Always import React as a namespace and use `React.*` for all hooks and types:

```tsx
import * as React from 'react';

// ✅
const [value, setValue] = React.useState(null);
const ref = React.useRef<HTMLDivElement | null>(null);
const cb = React.useCallback(() => {}, []);

// ❌
import { useState, useRef, useCallback } from 'react';
```

---

## TypeScript

- No `any` — use `unknown`
- No empty interfaces — use `type`
- No `MutableRefObject` — use `RefObject`
- No `css` helper from styled-components

---

## if statements

Always with curly braces, body on a new line:

```ts
// ✅
if (disabled) {
  return;
}

// ❌
if (disabled) return;
if (disabled) { return; }
```

---

## Keep it minimal

- Do not add `aria-*` attributes or `role` unless explicitly asked
- Do not add `defaultOpen`, `required`, `readOnly` unless used
- Do not add `children?: never` to forbid children
- Do not add `forwardRef` if ref is not needed outside
- Do not use `useMemo`/`useCallback` without a real reason
- Replace `data-*` styling attributes with `$`-props

---

## Example: select structure

```
src/select/
  index.ts                         # namespace: Select.Root, Select.Item... + re-exports all types
  index.parts.ts                   # flat named exports: Root, Trigger, Item...
  root/
    index.ts
    root.tsx                       # Root component (context provider)
    root.context.ts                # RootContext + useRootContext
  trigger/
    index.ts
    trigger.tsx
    trigger.styled.ts
  item/
    index.ts
    item.tsx
    item.context.ts                # ItemContext + useItemContext
    item.styled.ts                 # includes ItemIndicator, ItemText styled components
  ...
```
