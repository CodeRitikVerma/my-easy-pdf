'use client';
import { useState, useEffect } from 'react';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const detect = () =>
      window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 768;
    setIsMobile(detect());
    const handler = () => setIsMobile(detect());
    window.addEventListener('resize', handler);
    window.addEventListener('orientationchange', handler);
    return () => {
      window.removeEventListener('resize', handler);
      window.removeEventListener('orientationchange', handler);
    };
  }, []);

  return isMobile;
};

export default useIsMobile;
