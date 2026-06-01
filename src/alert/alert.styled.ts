import styled, { keyframes } from 'styled-components';
import type { AlertType } from './store.ts';

const enterAnimation = keyframes`
  from {
    transform: translateY(8px) scale(0.98);
    opacity: 0;
  }

  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
`;

const alertTypeColors: Record<
  AlertType,
  {
    background: string;
    border: string;
    text: string;
    accent: string;
  }
> = {
  success: {
    background: '#f0fdf4',
    border: '#bbf7d0',
    text: '#14532d',
    accent: '#16a34a',
  },
  error: {
    background: '#fef2f2',
    border: '#fecaca',
    text: '#7f1d1d',
    accent: '#dc2626',
  },
  warning: {
    background: '#fffbeb',
    border: '#fde68a',
    text: '#78350f',
    accent: '#d97706',
  },
  default: {
    background: '#ffffff',
    border: '#e2e8f0',
    text: '#0f172a',
    accent: '#64748b',
  },
};

export const AlertViewport = styled.div`
  position: fixed;
  right: 16px;
  bottom: 16px;
  z-index: 9999;

  display: flex;
  flex-direction: column;
  gap: 12px;

  width: min(100vw - 32px, 420px);

  pointer-events: none;

  @media (max-width: 480px) {
    right: 12px;
    left: 12px;
    width: auto;
  }
`;

export const AlertRoot = styled.div<{
  $type: AlertType;
}>`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: start;
  gap: 12px;

  width: 100%;
  padding: 14px;
  border: 1px solid ${({ $type }) => alertTypeColors[$type].border};
  border-radius: 14px;

  background: ${({ $type }) => alertTypeColors[$type].background};
  color: ${({ $type }) => alertTypeColors[$type].text};

  box-shadow:
    0 16px 40px rgb(15 23 42 / 14%),
    0 2px 8px rgb(15 23 42 / 8%);

  pointer-events: auto;

  animation: ${enterAnimation} 160ms ease-out;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const AlertIcon = styled.div<{
  $type: AlertType;
}>`
  display: grid;
  place-items: center;

  width: 24px;
  height: 24px;
  border-radius: 999px;

  background: ${({ $type }) => alertTypeColors[$type].accent};
  color: #ffffff;

  font-size: 13px;
  font-weight: 700;
  line-height: 1;
`;

export const AlertContent = styled.div`
  display: grid;
  gap: 4px;
  min-width: 0;
`;

export const AlertTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  line-height: 1.35;
`;

export const AlertDescription = styled.div`
  font-size: 14px;
  line-height: 1.45;
  opacity: 0.9;
`;

export const AlertCloseButton = styled.button`
  width: 28px;
  height: 28px;

  border: 0;
  border-radius: 8px;

  background: transparent;
  color: currentColor;

  font-size: 20px;
  line-height: 1;

  cursor: pointer;
  opacity: 0.65;

  &:hover {
    background: rgb(15 23 42 / 8%);
    opacity: 1;
  }
`;
