import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiService } from '@/core/api/apiService.ts';
import { edgeConfigModule } from '@/features/edge-config';

export const store = configureStore({
  reducer: {
    [apiService.reducerPath]: apiService.reducer,
    config: edgeConfigModule.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiService.middleware),
  devTools: true,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
