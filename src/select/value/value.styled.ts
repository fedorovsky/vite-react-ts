import styled from 'styled-components';

export const Value = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &[data-placeholder] {
    color: #9ca3af;
  }
`;
