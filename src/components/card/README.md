# The `slots` + `slotProps` pattern

A guide to building configurable components with the **slot-props** pattern (a.k.a.
the "slots API", familiar from MUI Base / Radix). The reference implementation is
[`card.tsx`](./card.tsx).

---

## TL;DR

Slot-props gives the consumer of a component control over:

1. **WHAT each part renders as** (`slots` — which HTML tag or React component);
2. **WHICH props each part receives** (`slotProps` — `className`, `onClick`, `data-*`, etc.).

Meanwhile the component keeps its structure, default styles, and logic. The consumer
doesn't rewrite the markup — they swap individual "slots" surgically.

```tsx
// default
<Card title="Title" description="Text" />

// custom tag for the title + arbitrary props on it
<Card
  title="Custom header"
  slots={{ title: CustomHeader }}
  slotProps={{ title: { 'data-test': 'header', onClick: handle } }}
/>
```

---

## When to use it (and when not to)

| Use it | Don't use it |
| --- | --- |
| Reusable UI component in a library / design system | One-off component inside a single feature |
| You need to swap the tag (`h3` → `div`, `a` → `button`) | A single external `className` is enough |
| You need to forward arbitrary attributes onto inner nodes | 2-3 explicit props are enough (`titleClassName`) |
| Several independent "parts" (root / title / description) | Flat component with no nested structure |

When in doubt, start with explicit props. Slot-props adds type-level complexity that
only pays off on genuinely reusable components.

---

## Anatomy of the pattern (step by step)

### Step 1. Extract each part into its own slot component

Each "slot" is a standalone styled component in its own file (see the project
conventions in `CLAUDE.md`):

```
src/components/card/
├── root.ts          # Styled.div — the container
├── title.ts         # Styled.h3
├── description.ts   # Styled.p
├── card.tsx         # assembles the slots
├── README.md
└── index.ts
```

```ts
// root.ts
import { styled } from '@linaria/react';

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  /* ... */
`;
```

> Rule: one slot = one visual part. That gives you a swap point and a target for `slotProps`.

### Step 2. Type the props of a single slot

A slot can be any `ElementType` (the `'div'` tag, a styled component, your own
`Custom`). So we derive its props from the slot type itself via
`ComponentPropsWithoutRef`:

```ts
type DataAttributes = {
  [attr: `data-${string}`]: string | number | boolean | undefined;
};

type SlotProps<T extends React.ElementType> =
  React.ComponentPropsWithoutRef<T> & DataAttributes;
```

- `ComponentPropsWithoutRef<T>` — every valid prop for that specific `T`
  (`href` for `'a'`, `type` for `'button'`, and so on).
- `DataAttributes` is added because in this `@types/react` version `data-*` is not
  part of `HTMLAttributes`. It's a patch for the type version, not part of the
  pattern — on newer types the line may be unnecessary.

### Step 3. Make the component generic over the slot types

For TypeScript to know the **new** props after a slot swap (e.g. that `<a>` now has
`href`), the slot type must be parameterized. Give each slot its own type parameter,
defaulting to "the current slot component":

```ts
export interface CardProps<
  TRoot extends React.ElementType = typeof Root,
  TTitle extends React.ElementType = typeof Title,
  TDescription extends React.ElementType = typeof Description,
> {
  title?: string;
  description?: string;

  slots?: {
    root?: TRoot;
    title?: TTitle;
    description?: TDescription;
  };

  slotProps?: {
    root?: SlotProps<TRoot>;
    title?: SlotProps<TTitle>;
    description?: SlotProps<TDescription>;
  };
}
```

Wiring `TTitle` across both `slots.title` and `slotProps.title` is the "magic": pass
`slots={{ title: 'a' }}` and `slotProps.title` automatically starts accepting `href`.

### Step 4. Unpack the slots with defaults in the implementation

In the component body, pull out the slot components (capitalized — they're JSX tags)
and their props. Put the default right in the destructuring:

```tsx
const {
  root: RootSlot = Root,
  title: TitleSlot = Title,
  description: DescriptionSlot = Description,
} = slots;

const {
  root: rootSlotProps,
  title: titleSlotProps,
  description: descriptionSlotProps,
} = slotProps;
```

> Important: the name must be capitalized — `RootSlot` — otherwise JSX treats it as an HTML tag.

### Step 5. Assemble the markup

```tsx
return (
  <RootSlot ref={ref} {...rootSlotProps}>
    <TitleSlot {...titleSlotProps}>
      {titleSlotProps?.children ?? title}
    </TitleSlot>

    <DescriptionSlot {...descriptionSlotProps}>
      {descriptionSlotProps?.children ?? description}
    </DescriptionSlot>
  </RootSlot>
);
```

Two techniques worth borrowing:

1. **Convenient shortcut + full control at the same time.** There's a simple `title`
   prop for the 90% case, and `slotProps.title.children` for rich content. The slot's
   `children` wins: `titleSlotProps?.children ?? title`.
2. **`ref` goes to the root slot.** The external `ref` always points at the root slot,
   and its type adapts to the slot (see the bonus in Step 6).

### Step 6. Preserve the generic signature with a cast

`React.forwardRef` "collapses" generics — the wrapped component loses its type
parameters. So declare the desired call signature as a separate type and cast the
result to it:

```ts
type CardComponent = <
  TRoot extends React.ElementType = typeof Root,
  TTitle extends React.ElementType = typeof Title,
  TDescription extends React.ElementType = typeof Description,
>(
  props: CardProps<TRoot, TTitle, TDescription> & {
    ref?: React.Ref<React.ElementRef<TRoot>>;
  },
) => React.ReactElement | null;

export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  /* ... */
) {
  /* ... */
}) as CardComponent;
```

Without this cast, `slots={{ title: 'a' }}` won't surface `href` in `slotProps.title` —
the generic link is lost.

#### Bonus: make `ref` adapt to the root slot

Notice the `ref` type above isn't hardcoded — it's `React.Ref<React.ElementRef<TRoot>>`.
`ElementRef<TRoot>` extracts the underlying element type of whatever the root slot is,
so the consumer's `ref` follows the swap:

```tsx
// default root (styled.div) → ref is HTMLDivElement
const ref = useRef<HTMLDivElement>(null);
<Card ref={ref} />;

// root swapped to 'a' → ref must be HTMLAnchorElement; a div ref now errors
const linkRef = useRef<HTMLAnchorElement>(null);
<Card ref={linkRef} slots={{ root: 'a' }} />;
```

The implementation's `forwardRef<HTMLDivElement, CardProps>` can stay as-is — the cast
to `CardComponent` is what the consumer sees, and that's where the generic `ref` lives.

---

## How the consumer uses it

```tsx
import { Card } from './components/card';

// 1. Default — no need to know anything about slots
<Card title="Card title" description="A short description goes here." />

// 2. Swap a slot for your own component + props on it
const CustomHeader = styled.div`/* ... */`;

<Card
  title="Custom header"
  description="Rendered with a custom styled.div as the title slot."
  slots={{ title: CustomHeader }}
  slotProps={{ title: { 'data-test': 'test' } }}
/>

// 3. Swap the tag — slot-prop types adapt automatically
<Card
  slots={{ root: 'a' }}
  slotProps={{ root: { href: 'https://example.com' } }} // href is valid because root = 'a'
/>
```

---

## "Done right" checklist

- [ ] Every visual part is extracted into its own slot component / file.
- [ ] There are two independent objects: `slots` (what to render) and `slotProps` (with which props).
- [ ] `slotProps[x]` is typed via `ComponentPropsWithoutRef<TX>` from the same type parameter as `slots[x]`.
- [ ] Every slot has a default — the component works with no `slots`/`slotProps` at all.
- [ ] Slot variables are capitalized (`TitleSlot`), otherwise JSX breaks.
- [ ] `ref` is forwarded to the root slot, typed as `React.Ref<React.ElementRef<TRoot>>` so it adapts to slot swaps.
- [ ] Common cases have simple shortcut props (`title`, `description`), with `slotProps.children` taking priority.
- [ ] The generic signature is restored with a cast after `forwardRef`.

---

## Common mistakes

| Mistake | Symptom | Fix |
| --- | --- | --- |
| Lowercase slot variable (`titleSlot`) | React renders the string as an HTML tag | Name it `TitleSlot` |
| `slotProps` not tied to the slot generic | No `href` in types after `slots={{ root:'a' }}` | One `T` for both `slots[x]` and `slotProps[x]` |
| Forgot the cast after `forwardRef` | Generics "collapsed", no autocomplete | `... as CardComponent` |
| Hardcoded tag inside (`<h3>`) | The slot can't be swapped | Render via `<TitleSlot>` |
| No slot defaults | Component crashes without `slots` | `title: TitleSlot = Title` in the destructuring |

---

## Extending the pattern

- **A new slot:** add a `*.ts` file with the styled component → a `TX` type parameter
  in `CardProps` → a field in `slots` and `slotProps` → a defaulted variable and a node
  in the JSX.
- **Callbacks / state into a slot:** if a slot needs computed values (e.g. `isActive`),
  use a render prop or a `slotProps` factory function — but that's the next level, start
  with the simple variant above.
