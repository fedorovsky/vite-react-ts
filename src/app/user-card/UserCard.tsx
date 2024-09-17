import { useMutation, useQueryClient } from '@tanstack/react-query';

interface User {
  id: string;
  name: string;
}

export const UserCard = ({ user }: { user: User }) => {
  const queryClient = useQueryClient();

  const deleteUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      const response = await fetch(`http://localhost:8000/users/${userId}`, {
        method: 'DELETE',
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: Error) => {
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
