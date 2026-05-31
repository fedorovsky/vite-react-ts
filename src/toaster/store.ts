import type { ReactNode } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'default';

export type ToastOptions = {
  title?: ReactNode;
  description?: ReactNode;
  duration?: number;
};

export type ToastInput = ToastOptions | string;

export interface ToasterApi {
  success: (toast: ToastInput) => string;
  error: (toast: ToastInput) => string;
  warning: (toast: ToastInput) => string;
  default: (toast: ToastInput) => string;
  clear: () => void;
}

export type ToastItem = ToastOptions & {
  id: string;
  type: ToastType;
};

export const DEFAULT_DURATION = 5000;
export const MAX_TOASTS = 3;

export const toastIcons: Record<ToastType, string> = {
  success: '✓',
  error: '!',
  warning: '!',
  default: 'i',
};

let addToast: ((toast: ToastItem) => void) | null = null;
let clearToasts: (() => void) | null = null;

export const setToastHandler = (
  nextAddToast: ((toast: ToastItem) => void) | null,
  nextClearToasts: (() => void) | null,
) => {
  addToast = nextAddToast;
  clearToasts = nextClearToasts;
};

const createToastId = () => {
  const cryptoWithUuid = globalThis.crypto as Crypto & {
    randomUUID?: () => string;
  };

  if (cryptoWithUuid?.randomUUID) {
    return cryptoWithUuid.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

const normalizeToastOptions = (toast: ToastInput): ToastOptions => {
  if (typeof toast === 'string') {
    return {
      title: toast,
    };
  }

  return toast;
};

function createToaster(): ToasterApi {
  const createToast = (type: ToastType) => (toast: ToastInput) => {
    const options = normalizeToastOptions(toast);
    const id = createToastId();

    addToast?.({
      id,
      type,
      duration: DEFAULT_DURATION,
      ...options,
    });

    return id;
  };

  return {
    success: createToast('success'),
    error: createToast('error'),
    warning: createToast('warning'),
    default: createToast('default'),
    clear: () => {
      clearToasts?.();
    },
  };
}

export const toaster = createToaster();
