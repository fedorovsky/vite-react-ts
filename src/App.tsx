import { Modal } from '@/app/upsell-offers';
import { useAppDispatch } from '@/core/hooks/useAppDispatch.ts';

export default function App() {
  const dispatch = useAppDispatch();

  const triggerModal = async () => {
    try {
      const result = await dispatch({ type: 'upsellOffers/showModal' });
      console.log('Modal confirmed ======>', result);
    } catch (error) {
      console.log('Modal cancelled ======>', error);
    }
  };

  const hideModal = () => {
    dispatch({ type: 'upsellOffers/hideModal' });
  };

  return (
    <div>
      <button onClick={triggerModal}>Show Modal</button>
      <button onClick={hideModal}>Hide Modal</button>
      <Modal />
    </div>
  );
}
