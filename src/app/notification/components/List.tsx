import { useAppSelector } from '@/core/hooks/useAppSelector.ts';
import { notificationModule } from '@/app/notification';
import {
  Message,
  MemoizedMessage,
} from '@/app/notification/components/Message.tsx';

export const List = () => {
  const list = useAppSelector(notificationModule.selectors.list);

  return (
    <div className="border m-1 p-1">
      <div className="border m-1 p-1">
        <h2>List</h2>
        {list.map((item) => (
          <Message
            key={item.title}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>

      {/*<div className="border m-1 p-1">*/}
      {/*  <h2>Memoized List</h2>*/}
      {/*  {list.map((item) => (*/}
      {/*    <MemoizedMessage*/}
      {/*      key={item.title}*/}
      {/*      title={item.title}*/}
      {/*      description={item.description}*/}
      {/*    />*/}
      {/*  ))}*/}
      {/*</div>*/}
    </div>
  );
};
