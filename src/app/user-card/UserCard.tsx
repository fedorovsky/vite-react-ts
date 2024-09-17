import { useMutation, useQueryClient } from '@tanstack/react-query';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface User {
  id: string;
  name: string;
}

export const UserCard = ({ user }: { user: User }) => {
  const queryClient = useQueryClient();

  const deleteUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      await delay(2000);
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: Error, userId: string, context: any) => {
      // Revert to the previous state in case of an error
      if (context?.previousUsers) {
        queryClient.setQueryData(['users'], context.previousUsers);
      }
      console.error('Error deleting user:', error.message);
    },
  });

  const handleClickDeleteUser = (userId: string) => {
    deleteUserMutation.mutate(userId);
  };

  return (
    <div className="flex gap-2 p-2 my-1 border-2 rounded">
      <div>
        <div>UserName: {user.name}</div>
        <div>UserId: {user.id}</div>
      </div>
      <button
        onClick={() => handleClickDeleteUser(user.id)}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      >
        delete
      </button>
    </div>
  );
};
