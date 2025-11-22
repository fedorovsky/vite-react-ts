import * as React from 'react';
import * as Styled from './description.styled';

export interface DescriptionProps
  extends React.HTMLProps<HTMLParagraphElement> {
  children?: React.ReactNode;
}

export const Description = (props: DescriptionProps) => {
  return <Styled.Description {...props} />;
};
