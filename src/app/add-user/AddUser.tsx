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
      name: `${addUserInputValue}`,
    });
  };

  return (
    <div>
      <h2 className="text-2xl mb-1">Add User</h2>
      <div className="flex gap-1">
        <input
          type="text"
          value={addUserInputValue}
          onChange={(e) => setAddUserInputValue(e.target.value)}
          placeholder="UserName"
          className="border border-gray-300 rounded-md px-4 py-2"
        />
        <button
          onClick={handleClickAddUser}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Add
        </button>
      </div>
    </div>
  );
};
