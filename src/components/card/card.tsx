import * as React from 'react';
import { Root } from './root';
import { Title } from './title';
import { Description } from './description';

// `data-*` are not part of HTMLAttributes in this @types/react version, so we
// add them explicitly to every slot's props.
type DataAttributes = {
  [attr: `data-${string}`]: string | number | boolean | undefined;
};

type SlotProps<T extends React.ElementType> =
  React.ComponentPropsWithoutRef<T> & DataAttributes;

export interface CardProps<
  TRoot extends React.ElementType = typeof Root,
  TTitle extends React.ElementType = typeof Title,
  TDescription extends React.ElementType = typeof Description,
> {
  title?: string;
  description?: string;

  /**
   * Slots
   */
  slots?: {
    root?: TRoot;
    title?: TTitle;
    description?: TDescription;
  };

  /**
   * Slot Props
   */
  slotProps?: {
    root?: SlotProps<TRoot>;
    title?: SlotProps<TTitle>;
    description?: SlotProps<TDescription>;
  };
}

// Public, generic call signature. `forwardRef` collapses generics, so we
// implement with defaults and re-expose the generic type via this cast.
type CardComponent = <
  TRoot extends React.ElementType = typeof Root,
  TTitle extends React.ElementType = typeof Title,
  TDescription extends React.ElementType = typeof Description,
>(
  props: CardProps<TRoot, TTitle, TDescription> & {
    ref?: React.Ref<HTMLDivElement>;
  },
) => React.ReactElement | null;

export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  { title, description, slots = {}, slotProps = {} },
  ref,
) {
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
}) as CardComponent;
