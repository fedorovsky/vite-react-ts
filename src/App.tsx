import * as React from 'react';
import { useAppDispatch } from '@/core/hooks/useAppDispatch';
import { postsApi } from '@/app/posts/api';
import { Posts } from '@/app/posts';

export default function App() {
  const dispatch = useAppDispatch();
  const [isVisibleList, setVisibleUserList] = React.useState(true);

  const toggleUserList = () => {
    setVisibleUserList((s) => !s);
  };

  const handleClickInvalidate = () => {
    dispatch(postsApi.util.invalidateTags(['Posts']));
  };

  return (
    <div>
      <button onClick={handleClickInvalidate}>Invalidate Tag</button>
      <button onClick={toggleUserList}>Toggle List</button>
      {isVisibleList && (
        <>
          <Posts />
          <Posts />
        </>
      )}
    </div>
  );
}
