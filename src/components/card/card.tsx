import * as React from 'react';
import { Root, type RootProps } from './root';
import { Title, type TitleProps } from './title';
import { Description, type DescriptionProps } from './description';

export interface CardProps {
  title: string;
  description: string;
  /**
   * Slots
   */
  slots?: {
    root?: React.ElementType;
    title?: React.ElementType;
    description?: React.ElementType;
  };
  /**
   * Slot Props
   */
  slotProps?: {
    root?: RootProps;
    title?: TitleProps;
    description?: DescriptionProps;
  };
}

export const Card = ({
  title,
  description,
  slots = {},
  slotProps = {},
}: CardProps) => {
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
