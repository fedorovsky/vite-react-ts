import { useAppSelector } from '@/core/hooks/useAppSelector.ts';
import { notificationModule } from '@/app/notification';
import * as React from 'react';

export const SecondMessage = () => {
  const secondMessage = useAppSelector(
    notificationModule.selectors.secondMessage,
  );

  React.useEffect(() => {
    console.log('=======');
    console.log('Render', secondMessage);
    console.log('=======');
  }, [secondMessage]);

  if (!secondMessage) {
    return null;
  }

  return (
    <div className="border m-1 p-1">
      <h2>Second Message</h2>
      <div>{secondMessage.title}</div>
      <div>{secondMessage.description}</div>
    </div>
  );
};
