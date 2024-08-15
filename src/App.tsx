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
    <div className="p-1">
      <div className="flex gap-1">
        <button
          onClick={handleClickInvalidate}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Invalidate Tag
        </button>
        <button
          onClick={toggleUserList}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Toggle List
        </button>
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
