import * as React from 'react';

type OwnProps = {
  title: string;
  description: string;
};

export const Message: React.FC<OwnProps> = ({ title, description }) => {
  return (
    <div className="border m-1 p-1">
      <div>{title}</div>
      <div>{description}</div>
    </div>
  );
};

export const MemoizedMessage = React.memo(Message);
