import { useAppSelector } from '@/core/hooks/useAppSelector';
import { upsellOffersModule } from '@/app/upsell-offers';
import { useAppDispatch } from '@/core/hooks/useAppDispatch';

export const Modal = () => {
  const dispatch = useAppDispatch();
  const isVisibleModal = useAppSelector(
    upsellOffersModule.selectors.isVisibleModal,
  );

  const regularPack = useAppSelector(upsellOffersModule.selectors.regularPack);

  const upsellPack = useAppSelector(upsellOffersModule.selectors.upsellPack);

  if (!isVisibleModal) {
    return null;
  }

  const handleConfirm = () => {
    dispatch(upsellOffersModule.actions.resolveModal(upsellPack));
  };

  const handleCancel = () => {
    dispatch(upsellOffersModule.actions.rejectModal());
  };

  return (
    <div>
      <div>
        <div>
          <h2>Regular</h2>
          <p>{regularPack.title}</p>
        </div>
        <div>
          <h2>Upsell</h2>
          <p>{upsellPack.title}</p>
        </div>
      </div>
      <button onClick={handleConfirm}>Confirm</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};
