import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { upsellOffersModule } from '@/app/upsell-offers';
// import promiseMiddleware from './promiseMiddlewareTEST.ts';

export const store = configureStore({
  reducer: {
    upsellOffers: upsellOffersModule.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
  devTools: true,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
