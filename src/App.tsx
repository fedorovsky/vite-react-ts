import * as React from 'react';
import { useAppDispatch } from '@/core/hooks/useAppDispatch';
import { userApi } from '@/app/user/api';
import { UserList } from '@/app/user';

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
    <div>
      <button onClick={handleClickInvalidate}>Invalidate Tag</button>
      <button onClick={toggleUserList}>Toggle List</button>
      {isVisibleUserList && (
        <>
          <UserList />
          <UserList />
        </>
      )}
    </div>
  );
}
