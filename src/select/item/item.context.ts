import * as React from 'react';

export interface ItemContextValue {
  selected: boolean;
  highlighted: boolean;
}

export const ItemContext = React.createContext<ItemContextValue | undefined>(
  undefined,
);

export function useItemContext(): ItemContextValue {
  const context = React.useContext(ItemContext);
  if (!context) {
    throw new Error(
      'Select: ItemContext is missing. Item parts must be placed within <Select.Item>.',
    );
  }
  return context;
}
