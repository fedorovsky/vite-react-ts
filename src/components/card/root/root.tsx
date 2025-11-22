import * as React from 'react';
import * as Styled from './root.styled';

export interface RootProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const Root = (props: RootProps) => <Styled.Root {...props} />;
