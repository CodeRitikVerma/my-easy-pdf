import AboutPageClient from '@/components/pages/AboutPageClient';

const BASE = 'https://myeasypdf.com';
const PAGE = `${BASE}/about`;

export const metadata = {
  title: 'About MyEasyPDF — Free Privacy-First Browser PDF Tools',
  description:
    'MyEasyPDF is a free, 100% browser-based PDF toolkit. Merge, split, rotate, sign, convert, ' +
    'and scan PDFs without uploading a single file. Your documents never leave your device.',
  keywords: [
    'about MyEasyPDF', 'free browser PDF tools', 'privacy-first PDF', 'no upload PDF tool',
    'PDF tools without account', 'secure PDF editor online', 'MyEasyPDF about',
    'browser based PDF processing', 'Ritik Verma PDF tool', 'free PDF utilities no signup',
  ],
  alternates: { canonical: '/about' },
  openGraph: {
    url:         PAGE,
    title:       'About MyEasyPDF — Free Privacy-First PDF Tools',
    description: 'Free, private, browser-based PDF tools built for everyone. No uploads, no account, no watermarks.',
    images:      [{ url: `${BASE}/og-image.png`, width: 1200, height: 630, alt: 'About MyEasyPDF' }],
  },
  twitter: {
    title:       'About MyEasyPDF — Privacy-First PDF Tools',
    description: 'All PDF processing happens in your browser. No uploads, no data collection, no account required.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type':    'AboutPage',
  name:       'About MyEasyPDF',
  url:        PAGE,
  description:
    'MyEasyPDF is a free, 100% browser-based PDF toolkit. ' +
    'All processing happens locally — your files never leave your device.',
  mainEntity: {
    '@type':      'Organization',
    name:         'MyEasyPDF',
    url:          BASE,
    description:  'Free online PDF tools that run entirely in the browser — no uploads, no account, no watermarks.',
    founder:      { '@type': 'Person', name: 'Ritik Verma' },
    foundingDate: '2024',
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',  item: BASE },
      { '@type': 'ListItem', position: 2, name: 'About', item: PAGE },
    ],
  },
};

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AboutPageClient />
    </>
  );
}
