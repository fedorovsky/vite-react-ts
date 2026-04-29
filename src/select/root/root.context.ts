import * as React from 'react';

export interface RootContextValue {
  /**
   * Whether the popup is open.
   */
  open: boolean;
  /**
   * The currently selected value(s).
   */
  value: unknown;
  /**
   * Whether the select is disabled.
   */
  disabled: boolean;
  /**
   * Whether multiple selection is enabled.
   */
  multiple: boolean;
  /**
   * Change the selected value(s).
   */
  setValue: (nextValue: unknown) => void;
  /**
   * Open or close the popup.
   */
  setOpen: (open: boolean) => void;
  /**
   * The value of the currently highlighted (active) item (for keyboard/pointer navigation).
   */
  activeValue: unknown;
  /**
   * Set the currently highlighted (active) item value.
   */
  setActiveValue: (value: unknown) => void;
  /**
   * Ref to the trigger button element.
   */
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  /**
   * Ref to the popup container element.
   */
  popupRef: React.RefObject<HTMLDivElement | null>;
  /**
   * List of all item values currently rendered in the Popup.
   * Used for keyboard navigation between items (ArrowUp/ArrowDown).
   */
  itemValuesRef: React.RefObject<unknown[]>;
  /**
   * Register an item's value in the shared list (called on item mount).
   * Used for keyboard navigation.
   */
  registerItem: (value: unknown) => void;
  /**
   * Unregister an item's value from the shared list (called on item unmount).
   * Used for keyboard navigation.
   */
  unregisterItem: (value: unknown) => void;
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
