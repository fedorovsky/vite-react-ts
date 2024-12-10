import * as React from 'react';
import { useAppDispatch } from '@/core/hooks/useAppDispatch';
import { userApi } from '@/app/user/api';
import { UserList } from '@/app/user';
import { Button } from '@/components/ui/button';

export default function App() {
  const dispatch = useAppDispatch();
  const [isVisibleUserList, setVisibleUserList] = React.useState(false);

  const toggleUserList = () => {
    setVisibleUserList((s) => !s);
  };

  const handleClickInvalidate = () => {
    dispatch(userApi.util.invalidateTags(['User']));
  };

  return (
    <div className="p-1">
      <div className="flex gap-1">
        <Button onClick={handleClickInvalidate}>Invalidate Tag</Button>
        <Button onClick={toggleUserList}>Toggle List</Button>
      </div>

      {isVisibleUserList && (
        <>
          <UserList />
          <UserList />
        </>
      )}
    </div>
  );
}
