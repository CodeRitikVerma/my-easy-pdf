import CameraToPDFClient from '@/components/pages/CameraToPDFClient';

const BASE = 'https://myeasypdf.com';
const PAGE = `${BASE}/camera-to-pdf`;

export const metadata = {
  title: 'Camera to PDF — Scan Documents with Your Phone, No App Download',
  description:
    'Turn your phone camera into a document scanner — free, no app needed. Capture receipts, notes, and ID cards, apply cleanup filters, and download a multi-page PDF instantly from your browser.',
  keywords: [
    'camera to PDF', 'scan document to PDF free', 'phone camera document scanner',
    'scan to PDF no app', 'mobile document scanner free', 'scan receipts to PDF',
    'iPhone scan to PDF', 'Android scan to PDF free', 'browser document scanner',
    'camera scan PDF online',
  ],
  alternates: { canonical: '/camera-to-pdf' },
  openGraph: {
    url:         PAGE,
    title:       'Camera to PDF — Scan Documents with Your Phone',
    description: 'Scan documents with your phone camera and convert to PDF. No app required.',
    images:      [{ url: `${BASE}/opengraph-image`, width: 1200, height: 630, alt: 'Camera to PDF Scanner' }],
  },
  twitter: {
    title:       'Camera to PDF — Mobile Document Scanner',
    description: 'Scan docs with your phone camera, get a PDF instantly. No app download needed.',
  },
};

const jsonLd = {
  '@context':          'https://schema.org',
  '@type':             'MobileApplication',
  name:                'Camera to PDF',
  url:                 PAGE,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem:     'iOS, Android — runs in mobile web browser',
  description:
    'Free mobile document scanner. Capture photos with your phone camera and convert them to PDF. ' +
    'Review each shot, apply filters, reorder pages, and download your PDF — no app download required.',
  offers:   { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author:   { '@type': 'Person', name: 'Ritik Verma' },
  provider: { '@type': 'Organization', name: 'MyEasyPDF', url: BASE },
  featureList: [
    'Uses back camera for high-quality shots',
    'Review and retake before keeping',
    'Filters: Original, Enhance, Grayscale, Document',
    'Reorder photos before PDF creation',
    'Custom PDF name and page size',
    'No app download required',
  ],
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',           item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Camera to PDF',  item: PAGE },
    ],
  },
};

export default function CameraToPDFPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CameraToPDFClient />
    </>
  );
}
