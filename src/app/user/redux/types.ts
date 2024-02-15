export type Status = 'idle' | 'pending' | 'fulfilled' | 'rejected';

export type User = {
  id: string;
  name: string;
};

export type UserSlice = {
  status: Status;
  userList: User[];
};
