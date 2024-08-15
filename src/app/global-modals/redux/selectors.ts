import { createSelector } from '@reduxjs/toolkit';
import { type RootState } from '@/core/store';

import { GLOBAL_MODAL_NAME, PRIORITY_MODALS_CONFIG } from './constants';

const localState = (state: RootState) => state.globalModals;

export const waitingList = createSelector(
  localState,
  (state) => state.waitingList,
);

export const isPriorityModal = (modalName: GLOBAL_MODAL_NAME) =>
  createSelector(waitingList, (waitingList) => {
    const priorityModalsConfig = PRIORITY_MODALS_CONFIG[modalName];
    const hasHigherPriorityModals = lookHigherPriorityModals(
      priorityModalsConfig,
      waitingList,
    );
    return waitingList.includes(modalName) && !hasHigherPriorityModals;
  });

const lookHigherPriorityModals = (
  priorityModalsConfig: GLOBAL_MODAL_NAME[],
  waitingList: GLOBAL_MODAL_NAME[],
) =>
  waitingList.some((waitingItem) => priorityModalsConfig.includes(waitingItem));
