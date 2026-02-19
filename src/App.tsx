import { UserList } from '@/features/user';
import { useAppDispatch } from '@/core/hooks/useAppDispatch';
import { userModule } from '@/features/user';

export default function App() {
  const dispatch = useAppDispatch();

  const handleFetchUserList = () => {
    dispatch(userModule.asyncActions.getUserList());
  };

  return (
    <div>
      <div>
        <button onClick={handleFetchUserList}>Fetch User List</button>
      </div>
      <br />
      <UserList />
    </div>
  );
}
