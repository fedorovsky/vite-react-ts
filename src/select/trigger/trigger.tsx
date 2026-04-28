import * as React from 'react';
import { useRootContext } from '../root';
import { Value } from '../value';
import * as Styled from './trigger.styled';
import { useOutsideClick } from './use-outside-click';

export type TriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  placeholder?: string;
};

export function Trigger(props: TriggerProps) {
  const { placeholder, disabled: disabledProp, ...rest } = props;

  const {
    open,
    setOpen,
    disabled: selectDisabled,
    triggerRef,
    popupRef,
  } = useRootContext();

  const disabled = selectDisabled || disabledProp;

  const handleClick = React.useCallback(() => {
    if (disabled) {
      return;
    }
    setOpen(!open);
  }, [disabled, open, setOpen]);

  useOutsideClick(triggerRef, popupRef, () => {
    setOpen(false);
  });

  return (
    <Styled.Trigger
      $open={open}
      ref={triggerRef}
      type="button"
      disabled={disabled}
      onClick={handleClick}
      {...rest}
    >
      <Value placeholder={placeholder} />
      <Styled.Icon $open={open}>▼</Styled.Icon>
    </Styled.Trigger>
  );
}
