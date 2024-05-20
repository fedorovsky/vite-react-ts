import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiService } from '@/core/api/apiService.ts';
import { userListModule } from '@/app/user';
import { counterModule } from '@/app/counter';
import { notificationModule } from '@/app/notification';

export const store = configureStore({
  reducer: {
    [apiService.reducerPath]: apiService.reducer,
    [userListModule.name]: userListModule.reducer,
    [counterModule.name]: counterModule.reducer,
    [notificationModule.name]: notificationModule.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiService.middleware),
  devTools: true,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
