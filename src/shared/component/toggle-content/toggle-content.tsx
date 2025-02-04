import * as React from 'react';
import * as Styled from './toggle-content.styled.ts';

export const ToggleContent = ({
  children,
  text,
}: {
  children: React.ReactNode;
  text: string;
}) => {
  const [isVisible, setVisible] = React.useState(false);

  return (
    <Styled.ToggleContent>
      <button onClick={() => setVisible((s) => !s)}>Toggle - {text}</button>
      {isVisible && <div>{children}</div>}
    </Styled.ToggleContent>
  );
};
