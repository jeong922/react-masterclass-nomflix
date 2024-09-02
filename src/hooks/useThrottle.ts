import { useCallback, useRef } from 'react';

export const useThrottle = <T extends (...args: any[]) => void>(callback: T, delay: number) => {
  const isWaiting = useRef(false);

  return useCallback(
    (...args: Parameters<T>) => {
      if (!isWaiting.current) {
        callback(...args);

        isWaiting.current = true;
        setTimeout(() => {
          isWaiting.current = false;
        }, delay);
      }
    },
    [callback, delay]
  );
};
