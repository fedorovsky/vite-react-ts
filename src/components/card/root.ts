import { styled } from '@linaria/react';

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  max-width: 360px;
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #fff;
  box-shadow:
    0 1px 2px rgba(16, 24, 40, 0.04),
    0 4px 12px rgba(16, 24, 40, 0.06);
  font-family:
    system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
`;
