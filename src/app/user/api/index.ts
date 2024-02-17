import { api } from '@/core/api';
import { User } from '../redux/types.ts';

export const getUserListData = async () => {
  const userList = await api<User[]>('http://localhost:8000/users');

  return userList;
};
