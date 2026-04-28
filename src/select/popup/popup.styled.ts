import styled from 'styled-components';

export const Popup = styled.div<{ $open?: boolean }>`
  position: absolute;
  z-index: 1000;
  min-width: 150px;
  max-height: 300px;
  overflow-y: auto;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  padding: 4px;
  outline: none;

  animation: ${({ $open }) => $open ? 'selectPopupFadeIn 0.15s ease-out' : 'none'};

  @keyframes selectPopupFadeIn {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
