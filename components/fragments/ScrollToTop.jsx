'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Forces the window to scroll back to the top on every client-side
 * navigation. Next.js usually does this by default, but a sticky
 * navbar / scroll-anchoring can leave the new page mid-scrolled.
 */
const ScrollToTop = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Use `auto` (not `smooth`) so the jump is instantaneous and the
    // user never sees the old scroll position on the new page.
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
