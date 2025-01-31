import * as React from 'react';

export const Switcher = ({
  children,
  text,
}: {
  children: React.ReactNode;
  text: string;
}) => {
  const [isVisible, setVisible] = React.useState(false);

  return (
    <div>
      <button onClick={() => setVisible((s) => !s)}>Toggle - {text}</button>
      {isVisible && <div>{children}</div>}
    </div>
  );
};
