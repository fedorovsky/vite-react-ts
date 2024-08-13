import { RootState } from 'modules';
import { GLOBAL_MODAL_NAME, PRIORITY_MODALS_CONFIG } from '../constants';
import { waitingList, isPriorityModal } from '../selectors';

describe('Selectors', () => {
  const initialState = {
    globalModals: {
      waitingList: ['MODAL_A', 'MODAL_B', 'MODAL_C'],
    },
  };

  describe('waitingList selector', () => {
    it('should return the waitingList from the state', () => {
      const result = waitingList(initialState as RootState);
      expect(result).toEqual(['MODAL_A', 'MODAL_B', 'MODAL_C']);
    });
  });

  describe('isPriorityModal selector', () => {
    it('should return true if modal is in the waitingList and has no higher priority modals', () => {
      PRIORITY_MODALS_CONFIG['MODAL_A'] = []; // MODAL_A has the highest priority
      const selectIsPriorityModal = isPriorityModal('MODAL_A' as GLOBAL_MODAL_NAME);
      const result = selectIsPriorityModal(initialState as RootState);
      expect(result).toBe(true);
    });

    it('should return false if modal is not in the waitingList', () => {
      PRIORITY_MODALS_CONFIG['MODAL_D'] = []; // MODAL_D is not in the waitingList
      const selectIsPriorityModal = isPriorityModal('MODAL_D' as GLOBAL_MODAL_NAME);
      const result = selectIsPriorityModal(initialState as RootState);
      expect(result).toBe(false);
    });

    it('should return false if there are higher priority modals in the waitingList', () => {
      PRIORITY_MODALS_CONFIG['MODAL_C'] = ['MODAL_A', 'MODAL_B']; // MODAL_A and MODAL_B have higher priority
      const selectIsPriorityModal = isPriorityModal('MODAL_C' as GLOBAL_MODAL_NAME);
      const result = selectIsPriorityModal(initialState as RootState);
      expect(result).toBe(false);
    });
  });
});
