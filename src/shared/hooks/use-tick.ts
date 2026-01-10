import * as React from 'react';

interface UseTickOptions {
  /**
   * Starts the interval automatically on hook initialization.
   *
   * @default true
   */
  autoStart?: boolean;

  /**
   * Pauses the interval when the browser window loses focus.
   *
   * @default true
   */
  pauseOnBlur?: boolean;

  /**
   * Forces a tick when the window regains focus.
   *
   * @default true
   */
  forceTickOnFocus?: boolean;
}

export const useTick = (intervalMs: number, options: UseTickOptions = {}) => {
  const {
    autoStart = true,
    pauseOnBlur = true,
    forceTickOnFocus = true,
  } = options;

  const [tick, setTick] = React.useState(1);

  const intervalRef = React.useRef<number | null>(null);
  const isStoppedRef = React.useRef(false);
  const isPausedByBlurRef = React.useRef(false);

  const startInterval = React.useCallback(() => {
    if (intervalRef.current !== null) {
      return;
    }

    intervalRef.current = window.setInterval(() => {
      setTick((prev) => prev + 1);
    }, intervalMs);
  }, [intervalMs]);

  const clear = React.useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = React.useCallback(() => {
    isStoppedRef.current = false;
    startInterval();
  }, [startInterval]);

  const stop = React.useCallback(() => {
    isStoppedRef.current = true;
    isPausedByBlurRef.current = false;
    clear();
  }, [clear]);

  const handleBlur = React.useCallback(() => {
    if (isStoppedRef.current) {
      return;
    }

    isPausedByBlurRef.current = true;
    clear();
  }, [clear]);

  const handleFocus = React.useCallback(() => {
    if (isStoppedRef.current || !isPausedByBlurRef.current) {
      return;
    }

    isPausedByBlurRef.current = false;

    if (forceTickOnFocus) {
      setTick((prev) => prev + 1);
    }

    startInterval();
  }, [startInterval, forceTickOnFocus]);

  React.useEffect(() => {
    if (!pauseOnBlur) {
      return;
    }

    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
    };
  }, [pauseOnBlur, handleBlur, handleFocus]);

  React.useEffect(() => {
    if (autoStart) {
      start();
    }

    return () => stop();
  }, [autoStart, start, stop]);

  return {
    tick,
    start,
    stop,
  };
};
