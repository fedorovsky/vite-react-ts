import { GLOBAL_MODAL_NAME, usePriorityModal } from '@/app/global-modals';

export const ModalB = () => {
  const { isPriority, remove } = usePriorityModal(GLOBAL_MODAL_NAME.MODAL_B);

  if (!isPriority) {
    return null;
  }

  return (
    <div className="flex gap-1 mb-1 items-center">
      <h2>Modal B</h2>
      <button
        onClick={remove}
        className="block bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded"
      >
        Close
      </button>
    </div>
  );
};
