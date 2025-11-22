import * as React from 'react';
import * as Styled from './description.styled';

export interface DescriptionProps
  extends React.HTMLProps<HTMLParagraphElement> {
  children?: React.ReactNode;
}

export const Description = ({ children }: DescriptionProps) => {
  return <Styled.Description>{children}</Styled.Description>;
};
