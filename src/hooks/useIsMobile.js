import { useState, useEffect } from 'react';

/**
 * Returns true on phones and tablets (touch/coarse-pointer devices).
 * Returns false on desktops and laptops — even those with touchscreens —
 * because their primary pointer is still a mouse (fine/hover capable).
 *
 * Detection strategy (in order of reliability):
 *  1. CSS media `(pointer: coarse)` — true when the PRIMARY input is a finger
 *  2. Viewport width ≤ 768 px as a fallback for edge cases
 */
const useIsMobile = () => {
  const detect = () =>
    window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 768;

  const [isMobile, setIsMobile] = useState(() => detect());

  useEffect(() => {
    const handler = () => setIsMobile(detect());
    window.addEventListener('resize', handler);
    // Also listen for orientation changes on tablets
    window.addEventListener('orientationchange', handler);
    return () => {
      window.removeEventListener('resize', handler);
      window.removeEventListener('orientationchange', handler);
    };
  }, []);

  return isMobile;
};

export default useIsMobile;
