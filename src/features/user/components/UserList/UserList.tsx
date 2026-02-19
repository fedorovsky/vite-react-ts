import { useAppSelector } from '@/core/hooks/useAppSelector';
import { userModule } from '@/features/user';
import * as Styled from './UserList.styled';

const UserList = () => {
  const userList = useAppSelector(userModule.selectors.userList);

  return (
    <Styled.UserList>
      {userList.map((user) => (
        <Styled.User key={user.id}>
          <p>User name: {user.name}</p>
        </Styled.User>
      ))}
    </Styled.UserList>
  );
};

export default UserList;
