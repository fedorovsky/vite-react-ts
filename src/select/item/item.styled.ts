import styled from 'styled-components';

export const Indicator = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  flex-shrink: 0;
  font-size: 12px;
`;

export const Text = styled.span`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Item = styled.div<{
  $selected?: boolean;
  $highlighted?: boolean;
}>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  line-height: 1.5;
  outline: none;
  user-select: none;
  transition: background 0.1s;
  background: ${({ $highlighted }) =>
    $highlighted ? '#f3f4f6' : 'transparent'};
  font-weight: ${({ $selected }) => ($selected ? 500 : 400)};
`;
