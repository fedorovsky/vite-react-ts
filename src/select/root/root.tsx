import * as React from 'react';
import { RootContext } from './root.context';
import { Trigger } from '../trigger';
import { Portal } from '../portal';
import { Popup } from '../popup';

export type RootProps<Value = unknown, Multiple extends boolean = false> = {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  placeholder?: string;
  multiple?: Multiple;
  value?: Multiple extends true ? Value[] : Value | null;
  defaultValue?: Multiple extends true ? Value[] : Value | null;
  onValueChange?: Multiple extends true
    ? (value: Value[]) => void
    : (value: Value | null) => void;
};

/**
 * Groups all parts of the select.
 * Doesn't render its own HTML element.
 */
export function Root<Value = unknown, Multiple extends boolean = false>(
  props: RootProps<Value, Multiple>,
) {
  const {
    value: valueProp,
    defaultValue = null,
    onValueChange,
    open: openProp,
    onOpenChange,
    disabled = false,
    multiple = false,
    children,
    placeholder,
  } = props;

  // Controlled / uncontrolled value
  const isValueControlled = valueProp !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = React.useState<unknown>(
    multiple ? (defaultValue ?? []) : defaultValue,
  );
  const value = isValueControlled ? valueProp : uncontrolledValue;

  // Controlled / uncontrolled open
  const isOpenControlled = openProp !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  const open = isOpenControlled ? openProp : uncontrolledOpen;

  const [activeValue, setActiveValue] = React.useState<unknown>(null);

  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const popupRef = React.useRef<HTMLDivElement | null>(null);
  const itemValuesRef = React.useRef<unknown[]>([]);

  const registerItem = React.useCallback((value: unknown) => {
    itemValuesRef.current = [...itemValuesRef.current, value];
  }, []);

  const unregisterItem = React.useCallback((value: unknown) => {
    itemValuesRef.current = itemValuesRef.current.filter((v) => v !== value);
  }, []);

  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      onOpenChange?.(nextOpen);
      if (!isOpenControlled) {
        setUncontrolledOpen(nextOpen);
      }
      setActiveValue(null);
    },
    [onOpenChange, isOpenControlled],
  );

  const setValue = React.useCallback(
    (nextValue: unknown) => {
      (onValueChange as ((value: unknown) => void) | undefined)?.(nextValue);
      if (!isValueControlled) {
        setUncontrolledValue(nextValue);
      }
    },
    [onValueChange, isValueControlled],
  );

  const contextValue = React.useMemo(
    () => ({
      open,
      value,
      disabled,
      multiple,
      setValue,
      setOpen,
      activeValue,
      setActiveValue,
      triggerRef,
      popupRef,
      itemValuesRef,
      registerItem,
      unregisterItem,
    }),
    [open, value, disabled, multiple, setValue, setOpen, activeValue, registerItem, unregisterItem],
  );

  return (
    <RootContext.Provider value={contextValue}>
      <Trigger placeholder={placeholder} />
      <Portal>
        <Popup>{children}</Popup>
      </Portal>
    </RootContext.Provider>
  );
}
