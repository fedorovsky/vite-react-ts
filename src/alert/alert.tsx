import * as React from 'react';
import { createPortal } from 'react-dom';
import * as Styled from './alert.styled.ts';
import {
  DEFAULT_DURATION,
  MAX_ALERTS,
  setAlertHandler,
  alertIcons,
  type AlertItem,
} from './store.ts';

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
        <Styled.AlertRoot key={alert.id} $type={alert.type}>
          <Styled.AlertIcon $type={alert.type} aria-hidden="true">
            {alertIcons[alert.type]}
          </Styled.AlertIcon>

          <Styled.AlertContent>
            {alert.title && (
              <Styled.AlertTitle>{alert.title}</Styled.AlertTitle>
            )}

            {alert.description && (
              <Styled.AlertDescription>
                {alert.description}
              </Styled.AlertDescription>
            )}
          </Styled.AlertContent>

          <Styled.AlertCloseButton
            type="button"
            aria-label="Close alert"
            onClick={() => removeAlert(alert.id)}
          >
            ×
          </Styled.AlertCloseButton>
        </Styled.AlertRoot>
      ))}
    </Styled.AlertViewport>,
    portalContainer,
  );
}
