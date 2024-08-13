import {
  globalModalsModule,
  GLOBAL_MODAL_NAME,
  usePriorityModal,
} from '@/app/global-modals';
import { useAppSelector } from '@/core/hooks/useAppSelector.ts';

export const WaitingList = () => {
  const waitingList = useAppSelector(globalModalsModule.selectors.waitingList);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th className="py-1 px-2 border-b border-gray-200 text-left">
              Modal Name
            </th>
            <th className="py-1 px-2 border-b border-gray-200 text-left">
              Priority Status
            </th>
          </tr>
        </thead>
        <tbody>
          {waitingList.map((item) => (
            <ModalPriorityDisplay key={item} modalName={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ModalPriorityDisplay = ({
  modalName,
}: {
  modalName: GLOBAL_MODAL_NAME;
}) => {
  const { isPriority } = usePriorityModal(modalName);
  return (
    <tr className={`${isPriority ? 'bg-green-500' : 'bg-red-500'}`}>
      <td className="py-1 px-2 border-b border-gray-200 text-left">
        {modalName}
      </td>
      <td className="py-1 px-2 border-b border-gray-200 text-left">
        {isPriority ? 'Priority' : 'Not Priority'}
      </td>
    </tr>
  );
};
