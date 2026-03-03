import { useAppDispatch } from '@/core/hooks/useAppDispatch';
import { userApi } from '@/app/user/api';
import { UserList } from '@/app/user';
import { ToggleContent } from '@/shared/component/toggle-content';

export default function App() {
  const dispatch = useAppDispatch();

  const handleClickInvalidate = () => {
    dispatch(userApi.util.invalidateTags(['User']));
  };

  return (
    <div>
      <button onClick={handleClickInvalidate}>Invalidate Tag</button>
      <UserList />
      <ToggleContent text="UserList">
        <UserList />
      </ToggleContent>
    </div>
  );
}
