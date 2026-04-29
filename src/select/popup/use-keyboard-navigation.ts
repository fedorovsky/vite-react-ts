import * as React from 'react';
import { useRootContext } from '../root';

export function useKeyboardNavigation() {
  const {
    popupRef,
    triggerRef,
    activeValue,
    setActiveValue,
    setValue,
    setOpen,
    multiple,
    value: selectedValue,
    itemValuesRef,
  } = useRootContext();

  React.useEffect(() => {
    const popup = popupRef.current;
    if (!popup) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      const items = itemValuesRef.current;
      if (items.length === 0) {
        return;
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        const currentIndex = items.indexOf(activeValue);
        const nextIndex =
          currentIndex === -1 || currentIndex === items.length - 1
            ? 0
            : currentIndex + 1;
        setActiveValue(items[nextIndex]);
        return;
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        const currentIndex = items.indexOf(activeValue);
        const prevIndex =
          currentIndex === -1 || currentIndex === 0
            ? items.length - 1
            : currentIndex - 1;
        setActiveValue(items[prevIndex]);
        return;
      }

      if (event.key === 'Enter') {
        event.preventDefault();
        if (activeValue === null) {
          return;
        }
        if (multiple) {
          const current = Array.isArray(selectedValue) ? selectedValue : [];
          const alreadySelected = current.includes(activeValue);
          const next = alreadySelected
            ? current.filter((v: unknown) => v !== activeValue)
            : [...current, activeValue];
          setValue(next);
        } else {
          setValue(activeValue);
          setOpen(false);
          triggerRef.current?.focus();
        }
        return;
      }

      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    popup.addEventListener('keydown', handleKeyDown);
    return () => {
      popup.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    popupRef,
    triggerRef,
    activeValue,
    setActiveValue,
    setValue,
    setOpen,
    multiple,
    selectedValue,
    itemValuesRef,
  ]);
}
