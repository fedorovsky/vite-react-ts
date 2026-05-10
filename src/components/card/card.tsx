import * as React from 'react';
import { Root } from './root';
import { Title } from './title';
import { Description } from './description';

export interface CardProps<
  TRoot extends React.ElementType = typeof Root,
  TTitle extends React.ElementType = typeof Title,
  TDescription extends React.ElementType = typeof Description,
> {
  title: string;
  description: string;

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
    root?: React.ComponentPropsWithoutRef<TRoot>;
    title?: React.ComponentPropsWithoutRef<TTitle>;
    description?: React.ComponentPropsWithoutRef<TDescription>;
  };
}

export const Card = <
  TRoot extends React.ElementType = typeof Root,
  TTitle extends React.ElementType = typeof Title,
  TDescription extends React.ElementType = typeof Description,
>({
  title,
  description,
  slots = {},
  slotProps = {},
}: CardProps<TRoot, TTitle, TDescription>) => {
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
    <RootSlot {...rootSlotProps}>
      <TitleSlot {...titleSlotProps}>
        {titleSlotProps?.children ?? title}
      </TitleSlot>

      <DescriptionSlot {...descriptionSlotProps}>
        {descriptionSlotProps?.children ?? description}
      </DescriptionSlot>
    </RootSlot>
  );
};
