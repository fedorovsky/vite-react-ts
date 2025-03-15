import * as React from 'react';
import { Posts } from '@/app/posts';
import { apiService, invalidateTags } from '@/core/api/apiService.ts';
import { useAppDispatch } from '@/core/hooks/useAppDispatch.ts';

export default function App() {
  const dispatch = useAppDispatch();
  const [isVisibleList, setVisibleUserList] = React.useState(true);

  const toggleUserList = () => {
    setVisibleUserList((s) => !s);
  };

  const handleInvalidate = () => {
    dispatch(apiService.util.invalidateTags([invalidateTags.Posts]));
  };

  return (
    <div>
      <button onClick={toggleUserList}>Toggle List</button>
      <button onClick={handleInvalidate}>Invalidate</button>
      {isVisibleList && (
        <>
          <Posts />
          <Posts />
        </>
      )}
    </div>
  );
}
