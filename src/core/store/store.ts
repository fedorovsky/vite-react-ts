import { configureStore } from '@reduxjs/toolkit';
import { userListModule } from '@/app/user';

export const store = configureStore({
  reducer: {
    user: userListModule.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
