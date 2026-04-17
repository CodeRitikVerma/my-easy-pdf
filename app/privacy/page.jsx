import PrivacyPageClient from '@/components/pages/PrivacyPageClient';

const BASE = 'https://myeasypdf.com';
const PAGE = `${BASE}/privacy`;

export const metadata = {
  title: 'Privacy Policy — MyEasyPDF',
  description:
    'MyEasyPDF privacy policy. All PDF processing runs entirely in your browser — ' +
    'your files are never uploaded, stored, or logged. No tracking, no data collection.',
  keywords: [
    'MyEasyPDF privacy policy', 'PDF tool privacy', 'no upload PDF privacy',
    'browser PDF data policy', 'PDF tools GDPR', 'secure PDF no server',
  ],
  alternates: { canonical: '/privacy' },
  openGraph: {
    url:         PAGE,
    title:       'Privacy Policy — MyEasyPDF',
    description: 'Your files never leave your device. No uploads, no tracking, no data collection.',
    images:      [{ url: `${BASE}/og-image.png`, width: 1200, height: 630, alt: 'MyEasyPDF Privacy Policy' }],
  },
  twitter: {
    title:       'Privacy Policy — MyEasyPDF',
    description: 'All processing happens in your browser. No file uploads, no tracking, no data collection.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type':    'WebPage',
  name:       'Privacy Policy — MyEasyPDF',
  url:        PAGE,
  description:
    'Privacy policy for MyEasyPDF. All PDF processing is done entirely in the user\'s browser. ' +
    'No files are uploaded to any server. No personal data is collected or stored.',
  publisher: { '@type': 'Organization', name: 'MyEasyPDF', url: BASE },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',           item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: PAGE },
    ],
  },
};

export default function PrivacyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PrivacyPageClient />
    </>
  );
}
