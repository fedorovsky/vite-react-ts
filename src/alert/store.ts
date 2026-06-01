import type { ReactNode } from 'react';

export type AlertType = 'success' | 'error' | 'warning' | 'default';

export type AlertOptions = {
  title?: ReactNode;
  description?: ReactNode;
  duration?: number;
};

export type AlertInput = AlertOptions | string;

export interface AlertApi {
  success: (alert: AlertInput) => string;
  error: (alert: AlertInput) => string;
  warning: (alert: AlertInput) => string;
  default: (alert: AlertInput) => string;
  clear: () => void;
}

export type AlertItem = AlertOptions & {
  id: string;
  type: AlertType;
};

export const DEFAULT_DURATION = 5000;
export const MAX_ALERTS = 3;

export const alertIcons: Record<AlertType, string> = {
  success: '✓',
  error: '!',
  warning: '!',
  default: 'i',
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
      title: alert,
    };
  }

  return alert;
};

function createAlertApi(): AlertApi {
  const createAlert = (type: AlertType) => (alert: AlertInput) => {
    const options = normalizeAlertOptions(alert);
    const id = createAlertId();

    addAlert?.({
      id,
      type,
      duration: DEFAULT_DURATION,
      ...options,
    });

    return id;
  };

  return {
    success: createAlert('success'),
    error: createAlert('error'),
    warning: createAlert('warning'),
    default: createAlert('default'),
    clear: () => {
      clearAlerts?.();
    },
  };
}

export const alert = createAlertApi();
