import { List } from './List.tsx';
import { useAppDispatch } from '@/core/hooks/useAppDispatch.ts';
import { notificationModule } from '@/app/notification';
import { MessageCounter } from '@/app/notification/components/MessageCounter.tsx';
import { SecondMessage } from '@/app/notification/components/SecondMessage.tsx';

export const Notifications = () => {
  const dispatch = useAppDispatch();

  const handleClickAddMessage = () => {
    dispatch(notificationModule.actions.addMessage());
  };

  const handleClickChangeFirstMessage = () => {
    dispatch(notificationModule.actions.changeFirstMessage());
  };

  return (
    <div className="border m-1 p-1">
      <h2>Notification</h2>
      <button
        onClick={handleClickAddMessage}
        className="px-2 py-1 text-white bg-blue-500 rounded shadow-md active:bg-blue-600 m-1"
      >
        Add message
      </button>
      <button
        onClick={handleClickChangeFirstMessage}
        className="px-2 py-1 text-white bg-blue-500 rounded shadow-md active:bg-blue-600 m-1"
      >
        change first
      </button>
      <List />
      <SecondMessage />
      <MessageCounter />
    </div>
  );
};
