import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiService } from '@/core/api/apiService.ts';
import { globalModalsModule } from '@/app/global-modals';

export const store = configureStore({
  reducer: {
    [apiService.reducerPath]: apiService.reducer,
    globalModals: globalModalsModule.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiService.middleware),
  devTools: true,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
