import * as React from 'react';
import { createPortal } from 'react-dom';
import { AlertCard } from './alert-card.tsx';
import * as Styled from './alert.styled.ts';
import {
  DEFAULT_DURATION,
  MAX_ALERTS,
  setAlertHandler,
  type AlertItem,
} from './alert.api.ts';

export function Alert() {
  const [alerts, setAlerts] = React.useState<AlertItem[]>([]);

  const removeAlert = React.useCallback((alertId: string) => {
    setAlerts((currentAlerts) =>
      currentAlerts.filter((alert) => alert.id !== alertId),
    );
  }, []);

  React.useEffect(() => {
    setAlertHandler(
      (alert) => {
        setAlerts((currentAlerts) =>
          [alert, ...currentAlerts].slice(0, MAX_ALERTS),
        );

        window.setTimeout(() => {
          removeAlert(alert.id);
        }, alert.duration ?? DEFAULT_DURATION);
      },
      () => {
        setAlerts([]);
      },
    );

    return () => {
      setAlertHandler(null, null);
    };
  }, [removeAlert]);

  const portalContainer = React.useMemo(() => {
    if (typeof document === 'undefined') {
      return null;
    }

    return document.body;
  }, []);

  if (!portalContainer) {
    return null;
  }

  return createPortal(
    <Styled.AlertViewport>
      {alerts.map((alert) => (
        <AlertCard
          key={alert.id}
          variant={alert.variant}
          label={alert.label}
          description={alert.description}
          onClose={() => removeAlert(alert.id)}
        />
      ))}
    </Styled.AlertViewport>,
    portalContainer,
  );
}
