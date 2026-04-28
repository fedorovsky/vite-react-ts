import * as React from 'react';
import { createPortal } from 'react-dom';
import { useRootContext } from '../root';

export interface PortalProps {
  children?: React.ReactNode;
}

/**
 * A portal that renders the select popup outside the DOM hierarchy.
 */
export function Portal(props: PortalProps) {
  const { children } = props;
  const { open } = useRootContext();

  if (!open) {
    return null;
  }

  return createPortal(children, document.body);
}
