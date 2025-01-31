import * as React from 'react';
import {
  userApi,
  useGetUsersQuery,
  useUpdateUserMutation,
  useAddUserMutation,
  useDeleteUserMutation,
} from '@/app/user/api/userApi.ts';
import { useAppDispatch } from '@/core/hooks/useAppDispatch.ts';
import * as Styled from './UserList.styled';

const UserList = () => {
  const dispatch = useAppDispatch();
  const [isActiveFocus, setActiveFocus] = React.useState(false);

  const {
    data: users,
    error,
    isLoading,
    refetch,
  } = useGetUsersQuery(undefined, {
    refetchOnFocus: isActiveFocus,
    // refetchOnMountOrArgChange: 5
  });

  const [updateUser] = useUpdateUserMutation();
  const [addUser] = useAddUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  // useFocusWithCooldown(refetch, 5000);

  const handleClickUpdate = (id: number) => {
    console.log('id', id);
    updateUser({
      id: id,
      name: `updated-${Date.now()}`,
    });
  };

  const handleClickDelete = (id: number) => {
    console.log(id);
    deleteUser(id);
  };

  const handleClickAdd = () => {
    addUser({ name: `added-${Date.now()}` });
  };

  const toogleFocusOption = () => {
    setActiveFocus((s) => !s);
  };

  const handleRefetch = () => {
    refetch();
  };

  const handleInvalidateQueries = () => {
    dispatch(userApi.util.invalidateTags(['User']));
  };

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error loading users</div>;

  return (
    <Styled.UserList>
      <div>
        <p>refetchOnFocus: {isActiveFocus ? 'on' : 'off'}</p>
      </div>
      <button onClick={toogleFocusOption}>Toggle Focus</button>
      <button onClick={handleClickAdd}>Add User</button>
      <button onClick={handleRefetch}>refetch</button>
      <button onClick={handleInvalidateQueries}>invalidateQueries</button>
      {users?.map((user) => (
        <Styled.User key={user.id}>
          <p>User name: {user.name}</p>
          <button onClick={() => handleClickUpdate(user.id)}>update</button>
          <button onClick={() => handleClickDelete(user.id)}>
            Delete User
          </button>
        </Styled.User>
      ))}
    </Styled.UserList>
  );
};

export default UserList;
