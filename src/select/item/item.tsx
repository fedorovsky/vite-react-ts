import * as React from 'react';
import { useRootContext } from '../root';
import { ItemContext } from './item.context';
import * as Styled from './item.styled';

export interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: unknown;
  children?: React.ReactNode;
}

export const Item = React.memo(
  React.forwardRef<HTMLDivElement, ItemProps>(
    function Item(props, forwardedRef) {
      const { value = null, children, ...rest } = props;

      const {
        value: selectedValue,
        setValue,
        setOpen,
        multiple,
        activeValue,
        setActiveValue,
        registerItem,
        unregisterItem,
      } = useRootContext();

      React.useEffect(() => {
        registerItem(value);
        return () => {
          unregisterItem(value);
        };
      }, [value, registerItem, unregisterItem]);

      // True if this item's value is part of the current selection
      const selected = multiple
        ? Array.isArray(selectedValue) && selectedValue.includes(value)
        : selectedValue === value;

      // True if this item is currently active (hovered / keyboard-focused)
      const highlighted = activeValue === value;

      // Toggle (multiple) or pick (single) the value on click
      const handleClick = React.useCallback(() => {
        if (multiple) {
          const currentValue = Array.isArray(selectedValue)
            ? selectedValue
            : [];
          const nextValue = selected
            ? currentValue.filter((v: unknown) => v !== value)
            : [...currentValue, value];
          setValue(nextValue);
        } else {
          setValue(value);
          setOpen(false);
        }
      }, [multiple, selectedValue, selected, value, setValue, setOpen]);

      // Highlight this item when the pointer enters
      const handleMouseEnter = React.useCallback(() => {
        setActiveValue(value);
      }, [value, setActiveValue]);

      // Remove highlight when the pointer leaves
      const handleMouseLeave = React.useCallback(() => {
        setActiveValue(null);
      }, [setActiveValue]);

      const contextValue = React.useMemo(
        () => ({ selected, highlighted }),
        [selected, highlighted],
      );

      return (
        <ItemContext.Provider value={contextValue}>
          <Styled.Item
            ref={forwardedRef}
            $selected={selected}
            $highlighted={highlighted}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...rest}
          >
            {selected && <Styled.Indicator>✓</Styled.Indicator>}
            <Styled.Text>{children}</Styled.Text>
          </Styled.Item>
        </ItemContext.Provider>
      );
    },
  ),
);
