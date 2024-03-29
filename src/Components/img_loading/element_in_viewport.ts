import { useRef, useState, useEffect } from 'react';

export const useIsElementInViewport = (options?: IntersectionObserverInit) => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const callback = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    if (isVisible) {
      return;
    }
    const observer = new IntersectionObserver(callback, options);
    elementRef.current && observer.observe(elementRef.current);

    return () => observer.disconnect();
  }, [options, isVisible]);

  return { elementRef, isVisible };
};
