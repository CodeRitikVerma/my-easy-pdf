import SplitPDFClient from '@/components/pages/SplitPDFClient';

const BASE = 'https://myeasypdf.com';
const PAGE = `${BASE}/split-pdf`;

export const metadata = {
  title: 'Split PDF Online Free — Extract Pages or Custom Ranges Instantly',
  description:
    'Split a PDF into separate pages or custom page ranges — free, no sign-up, nothing uploaded. ' +
    'Download all output files as one ZIP. 100% private and browser-based.',
  keywords: [
    'split PDF online free', 'PDF splitter free', 'divide PDF into pages',
    'split PDF by page range', 'extract pages from PDF free', 'separate PDF pages online',
    'split PDF into multiple files', 'split PDF without uploading', 'free PDF splitter',
  ],
  alternates: { canonical: '/split-pdf' },
  openGraph: {
    url:         PAGE,
    title:       'Split PDF Online Free — No Upload',
    description: 'Split a PDF by page or custom ranges. Download as ZIP. No upload needed.',
    images:      [{ url: `${BASE}/og-image.png`, width: 1200, height: 630, alt: 'Split PDF Online' }],
  },
  twitter: {
    title:       'Split PDF Online Free',
    description: 'Split a PDF into pages or ranges and download as ZIP. 100% private, no upload.',
  },
};

const jsonLd = {
  '@context':          'https://schema.org',
  '@type':             'SoftwareApplication',
  name:                'Split PDF',
  url:                 PAGE,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem:     'Any — runs in your web browser',
  description:
    'Free online PDF splitter. Extract each page separately or define custom ranges like 1-3, 5, 7-9. ' +
    'Results downloaded as a ZIP archive. Completely browser-based.',
  offers:   { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author:   { '@type': 'Person', name: 'Ritik Verma' },
  provider: { '@type': 'Organization', name: 'MyEasyPDF', url: BASE },
  featureList: [
    'Split every page into separate PDFs',
    'Custom page range input (e.g. 1-3, 5, 7-9)',
    'Download all as ZIP',
    '100% browser-based — no upload',
    'No watermarks added',
  ],
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',       item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Split PDF',  item: PAGE },
    ],
  },
};

export default function SplitPDFPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SplitPDFClient />
    </>
  );
}
