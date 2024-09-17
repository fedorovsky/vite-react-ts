import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface User {
  id: string;
  name: string;
}

export const FeatureOne = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['users'],
    queryFn: async (): Promise<User[]> => {
      const response = await fetch('http://localhost:8000/users');
      return response.json();
    },
    // staleTime: 1000,
  });

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
      <h2>Feature One</h2>
      <div>
        {query.data?.map((user) => (
          <div key={user.id}>
            <span>{user.name}</span>
            <button onClick={() => handleClickDeleteUser(user.id)}>
              delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
