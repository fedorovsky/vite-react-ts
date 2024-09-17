import { useQuery } from '@tanstack/react-query';
import { UserCard } from '@/app/user-card';

interface User {
  id: string;
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
    <div className="p-2 border-2 rounded">
      <h2 className="text-2xl">Feature Two</h2>
      <div>
        {query.data?.map((user) => <UserCard key={user.id} user={user} />)}
      </div>
    </div>
  );
};
