import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
}

export const UserCard = ({ user }: { user: User }) => {
  const [userName, setUserName] = useState('');
  const queryClient = useQueryClient();

  useEffect(() => {
    setUserName(user.name);
  }, [user.name]);

  /**
   * DELETE
   */
  const deleteUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      const response = await fetch(`http://localhost:8000/users/${userId}`, {
        method: 'DELETE',
      });
      return response.json();
    },
    onMutate: (userId: string) => {
      // Optimistically update the cache
      const previousUsers = queryClient.getQueryData<User[]>(['users']);
      if (previousUsers) {
        queryClient.setQueryData(
          ['users'],
          previousUsers.filter((user) => user.id !== userId),
        );
      }
      // Return a context with the previous and optimistic data
      return { previousUsers };
    },
    onError: (error, userId, context) => {
      // Revert to the previous state in case of an error
      if (context?.previousUsers) {
        queryClient.setQueryData(['users'], context.previousUsers);
      }
      console.error('Error deleting user:', error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  /**
   * UPDATE
   */
  const updateUserNameMutation = useMutation({
    mutationFn: async ({
      userId,
      newName,
    }: {
      userId: string;
      newName: string;
    }) => {
      const response = await fetch(`http://localhost:8000/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName }),
      });
      if (!response.ok) {
        throw new Error('Error updating user name');
      }
      return response.json();
    },
    onMutate: async ({ userId, newName }) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['users'] });

      // Snapshot the previous value
      const previousUsers = queryClient.getQueryData<User[]>(['users']);

      // Optimistically update to the new name
      if (previousUsers) {
        queryClient.setQueryData(
          ['users'],
          previousUsers.map((user) =>
            user.id === userId ? { ...user, name: newName } : user,
          ),
        );
      }
      // Return a context with the previous value
      return { previousUsers };
    },
    onError: (error, _, context) => {
      // Rollback on failure
      if (context?.previousUsers) {
        queryClient.setQueryData(['users'], context.previousUsers);
      }
      console.error('Error updating user name:', error.message);
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const handleClickDeleteUser = (userId: string) => {
    deleteUserMutation.mutate(userId);
  };

  const handleSaveUser = () => {
    updateUserNameMutation.mutate({ userId: user.id, newName: userName });
  };

  return (
    <div className="flex gap-2 p-2 my-1 border-2 rounded">
      <div>
        <div>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2"
          />
        </div>
        <div>UserId: {user.id}</div>
      </div>
      <button
        onClick={() => handleSaveUser()}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      >
        save
      </button>
      <button
        onClick={() => handleClickDeleteUser(user.id)}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      >
        delete
      </button>
    </div>
  );
};
