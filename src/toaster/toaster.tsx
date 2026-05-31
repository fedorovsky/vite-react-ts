import * as React from 'react';
import { createPortal } from 'react-dom';
import * as Styled from './toaster.styled.ts';
import {
  DEFAULT_DURATION,
  MAX_TOASTS,
  setToastHandler,
  toastIcons,
  type ToastItem,
} from './store.ts';

export function Toaster() {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  const removeToast = React.useCallback((toastId: string) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== toastId),
    );
  }, []);

  React.useEffect(() => {
    setToastHandler(
      (toast) => {
        setToasts((currentToasts) =>
          [toast, ...currentToasts].slice(0, MAX_TOASTS),
        );

        window.setTimeout(() => {
          removeToast(toast.id);
        }, toast.duration ?? DEFAULT_DURATION);
      },
      () => {
        setToasts([]);
      },
    );

    return () => {
      setToastHandler(null, null);
    };
  }, [removeToast]);

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
    <Styled.ToastViewport>
      {toasts.map((toast) => (
        <Styled.ToastRoot key={toast.id} $type={toast.type}>
          <Styled.ToastIcon $type={toast.type} aria-hidden="true">
            {toastIcons[toast.type]}
          </Styled.ToastIcon>

          <Styled.ToastContent>
            {toast.title && (
              <Styled.ToastTitle>{toast.title}</Styled.ToastTitle>
            )}

            {toast.description && (
              <Styled.ToastDescription>
                {toast.description}
              </Styled.ToastDescription>
            )}
          </Styled.ToastContent>

          <Styled.ToastCloseButton
            type="button"
            aria-label="Close notification"
            onClick={() => removeToast(toast.id)}
          >
            ×
          </Styled.ToastCloseButton>
        </Styled.ToastRoot>
      ))}
    </Styled.ToastViewport>,
    portalContainer,
  );
}
