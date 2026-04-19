import CookiePolicyClient from '@/components/pages/CookiePolicyClient';

const BASE = 'https://myeasypdf.com';
const PAGE = `${BASE}/cookie-policy`;

export const metadata = {
  title: 'Cookie Policy — MyEasyPDF',
  description:
    'MyEasyPDF cookie policy. We do not set tracking cookies. Google AdSense may set third-party cookies ' +
    'to serve relevant ads. Learn how to control or opt out of cookies.',
  keywords: [
    'MyEasyPDF cookie policy', 'Google AdSense cookies', 'PDF tool cookies',
    'opt out advertising cookies', 'third-party cookies', 'GDPR cookies',
  ],
  alternates: { canonical: '/cookie-policy' },
  openGraph: {
    url:         PAGE,
    title:       'Cookie Policy — MyEasyPDF',
    description: 'We do not set tracking cookies. See how Google AdSense uses cookies and how to opt out.',
    images:      [{ url: `${BASE}/og-image.png`, width: 1200, height: 630, alt: 'MyEasyPDF Cookie Policy' }],
  },
  twitter: {
    title:       'Cookie Policy — MyEasyPDF',
    description: 'We do not set tracking cookies. Google AdSense may set cookies for ad relevance — learn how to opt out.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type':    'WebPage',
  name:       'Cookie Policy — MyEasyPDF',
  url:        PAGE,
  description: 'Cookie policy for MyEasyPDF. The site itself sets no tracking cookies. ' +
               'Google AdSense may set third-party cookies for advertising personalisation.',
  publisher: { '@type': 'Organization', name: 'MyEasyPDF', url: BASE },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',          item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Cookie Policy', item: PAGE },
    ],
  },
};

export default function CookiePolicyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CookiePolicyClient />
    </>
  );
}
