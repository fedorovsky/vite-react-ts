import * as React from 'react';
import { useAppDispatch } from '@/core/hooks/useAppDispatch';
import { useAppSelector } from '@/core/hooks/useAppSelector';
import { actions, selectors, constants } from '../redux';

const usePriorityModal = (modalName: constants.GLOBAL_MODAL_NAME) => {
  const dispatch = useAppDispatch();
  const isPriority = useAppSelector(selectors.isPriorityModal(modalName));

  const add = React.useCallback(() => {
    dispatch(actions.addToWaitingList(modalName));
  }, [dispatch, modalName]);

  const remove = React.useCallback(() => {
    dispatch(actions.removeFromWaitingList(modalName));
  }, [dispatch, modalName]);

  const clear = React.useCallback(() => {
    dispatch(actions.clearWaitingList());
  }, [dispatch]);

  return {
    isPriority,
    add,
    remove,
    clear,
  };
};

export default usePriorityModal;
