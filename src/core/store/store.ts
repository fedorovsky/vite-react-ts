import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiService } from '@/core/api/apiService.ts';
import { userListModule } from '@/app/user';
import { valibotSchemaErrorLogger } from '@/core/store/middlewares/valibot-schema-error-logger.ts';

export const store = configureStore({
  reducer: {
    [apiService.reducerPath]: apiService.reducer,
    user: userListModule.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiService.middleware,
      valibotSchemaErrorLogger,
    ),
  devTools: true,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
