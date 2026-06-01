import type { ReactNode } from 'react';

export type AlertVariant = 'regular' | 'error' | 'success' | 'info' | 'warning';

export type AlertOptions = {
  label?: ReactNode;
  description?: ReactNode;
  duration?: number;
};

export type AlertInput = AlertOptions | string;

export interface AlertApi {
  regular: (alert: AlertInput) => string;
  success: (alert: AlertInput) => string;
  error: (alert: AlertInput) => string;
  info: (alert: AlertInput) => string;
  warning: (alert: AlertInput) => string;
  clear: () => void;
}

export type AlertItem = AlertOptions & {
  id: string;
  variant: AlertVariant;
};

export const DEFAULT_DURATION = 5000;
export const MAX_ALERTS = 3;

export const alertIcons: Record<AlertVariant, string> = {
  regular: 'i',
  error: '!',
  success: '✓',
  info: 'i',
  warning: '!',
};

let addAlert: ((alert: AlertItem) => void) | null = null;
let clearAlerts: (() => void) | null = null;

export const setAlertHandler = (
  nextAddAlert: ((alert: AlertItem) => void) | null,
  nextClearAlerts: (() => void) | null,
) => {
  addAlert = nextAddAlert;
  clearAlerts = nextClearAlerts;
};

const createAlertId = () => {
  const cryptoWithUuid = globalThis.crypto as Crypto & {
    randomUUID?: () => string;
  };

  if (cryptoWithUuid?.randomUUID) {
    return cryptoWithUuid.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

const normalizeAlertOptions = (alert: AlertInput): AlertOptions => {
  if (typeof alert === 'string') {
    return {
      label: alert,
    };
  }

  return alert;
};

function createAlertApi(): AlertApi {
  const createAlert = (variant: AlertVariant) => (alert: AlertInput) => {
    const options = normalizeAlertOptions(alert);
    const id = createAlertId();

    addAlert?.({
      id,
      variant,
      duration: DEFAULT_DURATION,
      ...options,
    });

    return id;
  };

  return {
    regular: createAlert('regular'),
    error: createAlert('error'),
    success: createAlert('success'),
    info: createAlert('info'),
    warning: createAlert('warning'),
    clear: () => {
      clearAlerts?.();
    },
  };
}

export const alertApi = createAlertApi();
