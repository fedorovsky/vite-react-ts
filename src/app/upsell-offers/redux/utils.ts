import { SelectedPack } from '@/app/upsell-offers/redux/types.ts';

type DeferredObject = {
  resolve: ((value: SelectedPack) => void) | null;
  reject: ((reason?: any) => void) | null;
};

export const deferredObject: DeferredObject = {
  resolve: null,
  reject: null,
};
