
export type BillingPackItem = { key: string; name: string; quantity: number; image: string };

export type BillingPack = {
  priceId: number;
  customData: string;
  title: string;
  items: BillingPackItem[];
};

export type ModalData = { regular: BillingPack; upsell: BillingPack };

export type UpsellOffers = {
  isVisibleModal: boolean;
  data: ModalData;
};
