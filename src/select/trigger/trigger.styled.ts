import styled from 'styled-components';

export const Icon = styled.span<{ $open?: boolean }>`
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  font-size: 12px;
  transition: transform 0.2s;
  transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

export const Trigger = styled.button<{ $open?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 12px;
  border: 1px solid ${({ $open }) => ($open ? '#3b82f6' : '#ccc')};
  border-radius: 6px;
  background: #fff;
  cursor: pointer;
  font-size: 14px;
  line-height: 1.5;
  min-width: 150px;
  outline: none;
  user-select: none;

  &:focus-visible {
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
