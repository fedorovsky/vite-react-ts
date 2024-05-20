import { useAppSelector } from '@/core/hooks/useAppSelector.ts';
import { notificationModule } from '@/app/notification';

export const MessageCounter = () => {
  const list = useAppSelector(notificationModule.selectors.list);

  return (
    <div className="border m-1 p-1">
      <h2>Message Counter</h2>
      <div>{list.length}</div>
    </div>
  );
};
