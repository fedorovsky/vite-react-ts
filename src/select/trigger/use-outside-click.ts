import * as React from 'react';

const defaultEvents = ['mousedown', 'touchstart'];

export function useOutsideClick(
  triggerRef: React.RefObject<HTMLElement | null>,
  popupRef: React.RefObject<HTMLElement | null>,
  onClickAway: () => void,
  events?: string[],
) {
  const savedCallback = React.useRef(onClickAway);

  React.useEffect(() => {
    savedCallback.current = onClickAway;
  }, [onClickAway]);

  React.useEffect(() => {
    const activeEvents = events ?? defaultEvents;

    function handler(event: Event) {
      const target = event.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        popupRef.current?.contains(target)
      ) {
        return;
      }
      savedCallback.current();
    }

    for (const eventName of activeEvents) {
      document.addEventListener(eventName, handler);
    }
    return () => {
      for (const eventName of activeEvents) {
        document.removeEventListener(eventName, handler);
      }
    };
  }, [triggerRef, popupRef, events]);
}
