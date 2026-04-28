import * as React from 'react';
import { useRootContext } from '../root';
import * as Styled from './popup.styled';

export interface PopupProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function Popup(props: PopupProps) {
  const { children, ...rest } = props;
  const { open, popupRef, triggerRef } = useRootContext();

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

  if (!open) {
    return null;
  }

  return (
    <Styled.Popup
      $open={open}
      ref={popupRef}
      style={{ ...position }}
      {...rest}
    >
      {children}
    </Styled.Popup>
  );
}
