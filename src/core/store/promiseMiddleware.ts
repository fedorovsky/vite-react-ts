import { MiddlewareAPI, Dispatch, Action } from 'redux';
import { PayloadAction } from '@reduxjs/toolkit';

// Определяем типы для действий
const SHOW_MODAL = 'upsellOffers/showModal';
const RESOLVE_MODAL = 'upsellOffers/resolve';
const REJECT_MODAL = 'upsellOffers/reject';
const OPEN_MODAL = 'upsellOffers/open';

interface OpenModalAction extends Action<typeof OPEN_MODAL> {}

interface ResolveModalAction
  extends PayloadAction<string, typeof RESOLVE_MODAL> {}

interface RejectModalAction
  extends PayloadAction<string, typeof REJECT_MODAL> {}

type ModalActions =
  | Action<typeof SHOW_MODAL>
  | ResolveModalAction
  | RejectModalAction
  | OpenModalAction;

const promiseMiddleware = () => {
  let resolve: ((value: string) => void) | null = null;
  let reject: ((reason?: any) => void) | null = null;

  return ({ dispatch }: MiddlewareAPI) =>
    (next: Dispatch) => {
      return (action: ModalActions) => {
        switch (action.type) {
          case SHOW_MODAL:
            // Создаем и возвращаем новый промис, сохраняя его коллбеки
            return new Promise<string>((res, rej) => {
              resolve = res;
              reject = rej;
              dispatch({ type: OPEN_MODAL });
            });
          case RESOLVE_MODAL:
            // Вызываем resolve и очищаем ссылки
            if (resolve) {
              resolve(action.payload);
              resolve = null;
              reject = null;
            }
            break;
          case REJECT_MODAL:
            // Вызываем reject и очищаем ссылки
            if (reject) {
              reject(new Error(action.payload));
              resolve = null;
              reject = null;
            }
            break;
        }

        return next(action);
      };
    };
};

export default promiseMiddleware;
