import { useAppDispatch } from '@/core/hooks/useAppDispatch';
import { userApi } from '@/app/user/api';
import { UserList } from '@/app/user';
import UserListRefetchOnMount from '@/app/user/components/user-list-refetch-on-mount';
import { Switcher } from '@/shared/component/switcher.tsx';

export default function App() {
  const dispatch = useAppDispatch();

  const handleClickInvalidate = () => {
    dispatch(userApi.util.invalidateTags(['User']));
  };

  return (
    <div>
      <button onClick={handleClickInvalidate}>Invalidate Tag</button>

      <Switcher text="UserList">
        <UserList />
      </Switcher>
      <Switcher text="UserList">
        <UserList />
      </Switcher>
      <Switcher text="UserList - refetchOnMountOrArgChange: 10">
        <UserListRefetchOnMount />
      </Switcher>
    </div>
  );
}
