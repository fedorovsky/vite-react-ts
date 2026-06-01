import type { ReactNode } from 'react';
import * as Styled from './alert.styled.ts';
import { alertIcons, type AlertVariant } from './alert.api.ts';

export type AlertCardProps = {
  variant: AlertVariant;
  label?: ReactNode;
  description?: ReactNode;
  onClose: () => void;
};

export function AlertCard({
  variant,
  label,
  description,
  onClose,
}: AlertCardProps) {
  return (
    <Styled.AlertRoot $variant={variant}>
      <Styled.AlertIcon $variant={variant} aria-hidden="true">
        {alertIcons[variant]}
      </Styled.AlertIcon>

      <Styled.AlertContent>
        {label && <Styled.AlertTitle>{label}</Styled.AlertTitle>}

        {description && (
          <Styled.AlertDescription>{description}</Styled.AlertDescription>
        )}
      </Styled.AlertContent>

      <Styled.AlertCloseButton
        type="button"
        aria-label="Close alert"
        onClick={onClose}
      >
        ×
      </Styled.AlertCloseButton>
    </Styled.AlertRoot>
  );
}
