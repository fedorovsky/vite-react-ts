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
    <div>
      <div>UserName: {user.name}</div>
      <div>UserId: {user.id}</div>
      <button onClick={() => handleClickDeleteUser(user.id)}>delete</button>
    </div>
  );
};
