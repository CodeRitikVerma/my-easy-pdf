import RotatePDFClient from '@/components/pages/RotatePDFClient';

const BASE = 'https://myeasypdf.com';
const PAGE = `${BASE}/rotate-pdf`;

export const metadata = {
  title: 'Rotate PDF Pages Online Free — Fix Sideways or Upside-Down PDFs',
  description:
    'Rotate any PDF page 90° or 180° online — free, no upload, no sign-up. Rotations are saved permanently into the file, so they look correct in every PDF reader.',
  keywords: [
    'rotate PDF online free', 'rotate PDF pages', 'fix sideways PDF pages',
    'rotate PDF 90 degrees free', 'rotate PDF 180 degrees', 'flip PDF pages',
    'fix upside down PDF', 'permanent PDF rotation', 'rotate PDF without uploading',
  ],
  alternates: { canonical: '/rotate-pdf' },
  openGraph: {
    url:         PAGE,
    title:       'Rotate PDF Pages Free Online — 90° or 180°',
    description: 'Rotate any PDF pages 90° or 180°. Preview instantly. No upload needed.',
    images:      [{ url: `${BASE}/og-image.png`, width: 1200, height: 630, alt: 'Rotate PDF Online' }],
  },
  twitter: {
    title:       'Rotate PDF Pages Free Online',
    description: 'Rotate PDF pages 90° or 180°. Select specific pages or all. No upload.',
  },
};

const jsonLd = {
  '@context':          'https://schema.org',
  '@type':             'SoftwareApplication',
  name:                'Rotate PDF',
  url:                 PAGE,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem:     'Any — runs in your web browser',
  description:
    'Free online PDF page rotation tool. Rotate individual pages or all pages by 90° or 180°. ' +
    'Preview thumbnails update in real time. Completely browser-based, no server upload.',
  offers:   { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author:   { '@type': 'Person', name: 'Ritik Verma' },
  provider: { '@type': 'Organization', name: 'MyEasyPDF', url: BASE },
  featureList: [
    'Rotate individual or all pages',
    '90° clockwise, 90° counter-clockwise, 180° options',
    'Real-time thumbnail preview',
    '100% browser-based — no upload',
  ],
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',        item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Rotate PDF',  item: PAGE },
    ],
  },
};

export default function RotatePDFPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <RotatePDFClient />
    </>
  );
}
