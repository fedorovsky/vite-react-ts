import { UserList } from '@/app/user';
import { useAppDispatch } from '@/core/hooks/useAppDispatch.ts';
import { userListModule } from '@/app/user';

export default function App() {
  const dispatch = useAppDispatch();

  const handleClickGetUserList = () => {
    dispatch(userListModule.asyncActions.getUserList());
  };

  return (
    <div>
      <button onClick={handleClickGetUserList}>Get User List</button>
      <UserList />
    </div>
  );
}
