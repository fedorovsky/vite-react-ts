import { confirmModalModule, Modal } from '@/app/confirm-modal';
import { showModal } from '@/app/confirm-modal/redux/slice.ts';
import { useAppDispatch } from '@/core/hooks/useAppDispatch.ts';

export default function App() {
  const dispatch = useAppDispatch();

  const triggerModal = async () => {
    try {
      const result = await dispatch(showModal()).unwrap();
      console.log('Modal confirmed:', result);
    } catch (error) {
      console.log('Modal cancelled:', error);
    }
  };

  return (
    <div>
      <button onClick={triggerModal}>Show Modal</button>
      <Modal />
    </div>
  );
}
