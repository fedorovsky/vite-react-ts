import { RootState } from '@/core/store/store.ts';

export const confirmModal = (state: RootState) => state.confirmModal;

export const isOpen = (state: RootState) => state.confirmModal.isOpen;

export const callbacks = (state: RootState) => state.confirmModal.callbacks;
