import { RootState } from '@/core/store/store.ts';

export const confirmModal = (state: RootState) => state.upsellOffers;

export const isOpen = (state: RootState) => state.upsellOffers.isOpen;
