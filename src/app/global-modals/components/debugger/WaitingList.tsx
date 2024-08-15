import {
  globalModalsModule,
  GLOBAL_MODAL_NAME,
  usePriorityModal,
} from '@/app/global-modals';
import { useAppSelector } from '@/core/hooks/useAppSelector.ts';

export const WaitingList = () => {
  const waitingList = useAppSelector(globalModalsModule.selectors.waitingList);
  return (
    <table>
      <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th className="px-3 py-2">Waiting List</th>
          <th className="px-3 py-2">Modal Name</th>
          <th className="px-3 py-2">Priority Status</th>
        </tr>
      </thead>
      <tbody>
        {waitingList.map((item, index) => (
          <ModalPriorityDisplay index={index + 1} key={item} modalName={item} />
        ))}
      </tbody>
    </table>
  );
};

const ModalPriorityDisplay = ({
  index,
  modalName,
}: {
  index: number;
  modalName: GLOBAL_MODAL_NAME;
}) => {
  const { isPriority } = usePriorityModal(modalName);
  return (
    <tr className={`${isPriority ? 'bg-green-500' : 'bg-red-500'}`}>
      <td className="px-3 border-b dark:border-gray-700">{index}</td>
      <td className="px-3 border-b dark:border-gray-700">{modalName}</td>
      <td className="px-3 border-b dark:border-gray-700">
        {isPriority ? 'Priority' : 'Not Priority'}
      </td>
    </tr>
  );
};
