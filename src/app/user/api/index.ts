import { User } from '../redux/types.ts';

export const getUserListData = async () =>
  fetch('http://localhost:8000/users')
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json() as Promise<User[]>;
    })
    .then((data) => {
      return data;
    });
