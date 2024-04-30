import { RootState } from '@/core/store/store.ts';


export const isVisibleModal = (state: RootState) =>
  state.upsellOffers.isVisibleModal;

export const regularPack = (state: RootState) => state.upsellOffers.data.regular;

export const upsellPack = (state: RootState) => state.upsellOffers.data.upsell;
