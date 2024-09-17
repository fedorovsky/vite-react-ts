import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface User {
  id: string;
  name: string;
}

export const AddUser = () => {
  const [addUserInputValue, setAddUserInputValue] = useState('');

  const queryClient = useQueryClient();

  const addUserMutation = useMutation({
    mutationFn: async (newUser: User) => {
      const response = await fetch('http://localhost:8000/users', {
        method: 'POST',
        body: JSON.stringify(newUser),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: Error) => {
      console.error('Error adding user:', error.message);
    },
  });

  const handleClickAddUser = () => {
    addUserMutation.mutate({
      id: Date.now().toString(),
      name: `${addUserInputValue} - ${Date.now().toString()}`,
    });
  };

  return (
    <div>
      <h2>Add User</h2>
      <div>
        <input
          type="text"
          value={addUserInputValue}
          onChange={(e) => setAddUserInputValue(e.target.value)}
        />
        <button onClick={handleClickAddUser}>Add</button>
      </div>
    </div>
  );
};
