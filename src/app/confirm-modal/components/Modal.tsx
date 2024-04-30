import { useAppSelector } from '@/core/hooks/useAppSelector.ts';
import { confirmModalModule } from '@/app/confirm-modal';
import { useAppDispatch } from '@/core/hooks/useAppDispatch.ts';

export const Modal = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(confirmModalModule.selectors.isOpen);
  const callbacks = useAppSelector(confirmModalModule.selectors.callbacks);

  if (!isOpen) {
    return null;
  }

  const handleConfirm = () => {
    callbacks.resolve('confirmed');
    dispatch(confirmModalModule.actions.clearModal());
  };

  const handleCancel = () => {
    callbacks.reject(new Error('cancelled'));
    dispatch(confirmModalModule.actions.clearModal());
  };

  return (
    <div>
      <h1>Modal</h1>
      <button onClick={handleConfirm}>Confirm</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};
