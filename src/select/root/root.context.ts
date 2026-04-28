import * as React from 'react';

export interface RootContextValue {
  open: boolean;
  value: unknown;
  disabled: boolean;
  multiple: boolean;
  setValue: (nextValue: unknown) => void;
  setOpen: (open: boolean) => void;
  activeValue: unknown;
  setActiveValue: (value: unknown) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  popupRef: React.RefObject<HTMLDivElement | null>;
}

export const RootContext = React.createContext<RootContextValue | null>(null);

export function useRootContext(): RootContextValue {
  const context = React.useContext(RootContext);
  if (!context) {
    throw new Error(
      'Select: RootContext is missing. Select parts must be placed within <Select.Root>.',
    );
  }
  return context;
}
