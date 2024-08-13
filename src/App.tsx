import { ModalA } from '@/app/global-modals/components/ModalA.tsx';
import { ModalB } from '@/app/global-modals/components/ModalB.tsx';
import { ModalC } from '@/app/global-modals/components/ModalC.tsx';
import { Debugger } from '@/app/global-modals/components/Debugger.tsx';
import { usePriorityModal, GLOBAL_MODAL_NAME } from '@/app/global-modals';

export default function App() {
  const { add: addToWaitingListModalA, remove: removeFromWaitingListModalA } =
    usePriorityModal(GLOBAL_MODAL_NAME.MODAL_A);
  const { add: addToWaitingListModalB, remove: removeFromWaitingListModalB } =
    usePriorityModal(GLOBAL_MODAL_NAME.MODAL_B);
  const { add: addToWaitingListModalC, remove: removeFromWaitingListModalC } =
    usePriorityModal(GLOBAL_MODAL_NAME.MODAL_C);

  return (
    <div className="p-1">
      <div className="flex mb-2">
        <div className="w-1/2">
          <h2 className="border-b-2 pb-1 mb-2">Modals View</h2>
          <ModalA />
          <ModalB />
          <ModalC />
        </div>
        <div className="w-1/2">
          <h2 className="border-b-2 pb-1 mb-2">Waiting List Actions</h2>
          <div className="flex gap-1 mb-1">
            <button
              onClick={addToWaitingListModalA}
              className="block bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded"
            >
              Add Modal A
            </button>
            <button
              onClick={removeFromWaitingListModalA}
              className="block bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded"
            >
              Remove Modal A
            </button>
          </div>

          <div className="flex gap-1 mb-1">
            <button
              onClick={addToWaitingListModalB}
              className="block bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded"
            >
              Add Modal B
            </button>
            <button
              onClick={removeFromWaitingListModalB}
              className="block bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded"
            >
              Remove Modal B
            </button>
          </div>
          <div className="flex gap-1 mb-1">
            <button
              onClick={addToWaitingListModalC}
              className="block bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded"
            >
              Add Modal C
            </button>
            <button
              onClick={removeFromWaitingListModalC}
              className="block bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded"
            >
              Remove Modal C
            </button>
          </div>
        </div>
      </div>
      <Debugger />
    </div>
  );
}
