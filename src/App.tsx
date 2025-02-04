import { useAppDispatch } from '@/core/hooks/useAppDispatch';
import { userApi } from '@/app/user/api';
import { UserList } from '@/app/user';
import UserListRefetchOnMount from '@/app/user/components/user-list-refetch-on-mount';
import { ToggleContent } from '@/shared/component/toggle-content';

export default function App() {
  const dispatch = useAppDispatch();

  const handleClickInvalidate = () => {
    dispatch(userApi.util.invalidateTags(['User']));
  };

  return (
    <div>
      <button onClick={handleClickInvalidate}>Invalidate Tag</button>
      <ToggleContent text="UserList">
        <UserList />
      </ToggleContent>
      <ToggleContent text="UserList">
        <UserList />
      </ToggleContent>
      <ToggleContent text="UserList - refetchOnMountOrArgChange: 10">
        <UserListRefetchOnMount />
      </ToggleContent>
    </div>
  );
}
