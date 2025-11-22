import * as React from 'react';
import * as Styled from './title.styled.ts';

export interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
}

export const Title = ({ children }: TitleProps) => {
  return <Styled.Title>{children}</Styled.Title>;
};
