import { useAppSelector } from '@/core/hooks/useAppSelector.ts';
import { upsellOffersModule } from '@/app/upsell-offers';
import { useAppDispatch } from '@/core/hooks/useAppDispatch.ts';

export const Modal = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(upsellOffersModule.selectors.isOpen);

  if (!isOpen) {
    return null;
  }

  const handleConfirm = () => {
    dispatch({ type: 'upsellOffers/resolve', payload: 'Confirmed' });
  };

  const handleCancel = () => {
    dispatch({ type: 'upsellOffers/reject', payload: 'Cancelled' });
  };

  return (
    <div>
      <h1>Modal</h1>
      <button onClick={handleConfirm}>Confirm</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};
