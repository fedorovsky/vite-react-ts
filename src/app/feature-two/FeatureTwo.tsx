import { useQuery } from '@tanstack/react-query';

interface User {
  id: number;
  name: string;
}

export const FeatureTwo = () => {
  const query = useQuery({
    queryKey: ['users'],
    queryFn: async (): Promise<User[]> => {
      const response = await fetch('http://localhost:8000/users');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    // staleTime: 1000,
  });

  return (
    <div>
      <h2>Feature Two</h2>
      <div>
        {query.data?.map((user) => <div key={user.id}>{user.name}</div>)}
      </div>
    </div>
  );
};