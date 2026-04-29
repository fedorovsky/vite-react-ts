import * as React from 'react';
import { useRootContext } from '../root';
import * as Styled from './popup.styled';
import { useKeyboardNavigation } from './use-keyboard-navigation';

export interface PopupProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function Popup(props: PopupProps) {
  const { children, ...rest } = props;
  const { open, popupRef, triggerRef } = useRootContext();

  useKeyboardNavigation();

  const [position, setPosition] = React.useState<React.CSSProperties>({});

  React.useLayoutEffect(() => {
    if (!open || !triggerRef.current) {
      return;
    }

    const triggerRect = triggerRef.current.getBoundingClientRect();
    setPosition({
      top: triggerRect.bottom + window.scrollY + 4,
      left: triggerRect.left + window.scrollX,
      minWidth: triggerRect.width,
    });
  }, [open, triggerRef]);

  React.useEffect(() => {
    if (open) {
      popupRef.current?.focus();
    }
  }, [open, popupRef]);

  if (!open) {
    return null;
  }

  return (
    <Styled.Popup
      $open={open}
      ref={popupRef}
      tabIndex={-1}
      style={{ ...position }}
      {...rest}
    >
      {children}
    </Styled.Popup>
  );
}
