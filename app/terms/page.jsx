import TermsPageClient from '@/components/pages/TermsPageClient';

const BASE = 'https://myeasypdf.com';
const PAGE = `${BASE}/terms`;

export const metadata = {
  title: 'Terms of Service — MyEasyPDF',
  description:
    'Terms of service for MyEasyPDF. Free to use for personal and commercial purposes. ' +
    'All PDF processing runs locally in your browser. No liability for file content.',
  keywords: [
    'MyEasyPDF terms of service', 'PDF tool terms', 'MyEasyPDF terms',
    'free PDF tool legal', 'PDF tools usage policy',
  ],
  alternates: { canonical: '/terms' },
  openGraph: {
    url:         PAGE,
    title:       'Terms of Service — MyEasyPDF',
    description: 'Free for personal and commercial use. All processing is local. Read the full terms.',
    images:      [{ url: `${BASE}/og-image.png`, width: 1200, height: 630, alt: 'MyEasyPDF Terms of Service' }],
  },
  twitter: {
    title:       'Terms of Service — MyEasyPDF',
    description: 'Free for personal and commercial use. All PDF processing is local in your browser.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type':    'WebPage',
  name:       'Terms of Service — MyEasyPDF',
  url:        PAGE,
  description:
    'Terms of service for MyEasyPDF. The service is free for personal and commercial use. ' +
    'All processing is client-side. Users are responsible for the files they process.',
  publisher: { '@type': 'Organization', name: 'MyEasyPDF', url: BASE },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',             item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Terms of Service', item: PAGE },
    ],
  },
};

export default function TermsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TermsPageClient />
    </>
  );
}
