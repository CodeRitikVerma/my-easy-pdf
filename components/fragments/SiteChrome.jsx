'use client';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

// Routes that render without the global header/footer.
const CHROMELESS_ROUTES = ['/muskan-birthday'];

const SiteChrome = ({ children }) => {
  const pathname = usePathname();
  const chromeless = CHROMELESS_ROUTES.includes(pathname);

  if (chromeless) {
    return <main id="main-content">{children}</main>;
  }

  return (
    <>
      <Header />
      <main id="main-content" className="flex-grow-1">{children}</main>
      <Footer />
    </>
  );
};

export default SiteChrome;
