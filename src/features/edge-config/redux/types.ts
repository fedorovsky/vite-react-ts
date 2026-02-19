export type Status = 'idle' | 'pending' | 'fulfilled' | 'rejected';

export type ConfigSlice = {
  status: Status;
  data: any;
};
