import { GLOBAL_MODAL_NAME, usePriorityModal } from '@/app/global-modals';

export const ControlsModalC = () => {
  const { add, remove } = usePriorityModal(GLOBAL_MODAL_NAME.MODAL_C);

  return (
    <div className="flex gap-1 mb-1">
      <button
        onClick={add}
        className="block bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded"
      >
        Add Modal C
      </button>
      <button
        onClick={remove}
        className="block bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded"
      >
        Remove Modal C
      </button>
    </div>
  );
};
