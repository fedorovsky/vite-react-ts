import * as React from 'react';
import { useRootContext } from '../root';
import * as Styled from './value.styled';

export interface ValueProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Placeholder text when no value is selected */
  placeholder?: string;
}

/**
 * A text label of the currently selected item.
 * Renders a `<span>` element.
 */
export function Value(props: ValueProps) {
  const { placeholder, ...rest } = props;

  const { value } = useRootContext();

  const hasValue =
    value !== null &&
    value !== undefined &&
    value !== '' &&
    !(Array.isArray(value) && value.length === 0);

  const displayValue = Array.isArray(value) ? value.join(', ') : String(value);

  return (
    <Styled.Value data-placeholder={!hasValue || undefined} {...rest}>
      {hasValue ? displayValue : placeholder}
    </Styled.Value>
  );
}
