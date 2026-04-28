import CropPDFClient from '@/components/pages/CropPDFClient';

const BASE = 'https://myeasypdf.com';
const PAGE = `${BASE}/crop-pdf`;

export const metadata = {
  title: 'Crop PDF Online Free — Trim Margins & Whitespace',
  description:
    'Crop PDF pages online for free. Drag an adjustable crop box to trim margins, ' +
    'whitespace or unwanted borders from one page or every page. 100% browser-based — ' +
    'no upload, no watermarks, no account.',
  keywords: [
    'crop PDF online free', 'trim PDF margins', 'cut PDF edges',
    'crop PDF pages', 'remove PDF whitespace', 'PDF crop tool online',
    'crop PDF no upload', 'free PDF cropper',
  ],
  alternates: { canonical: '/crop-pdf' },
  openGraph: {
    url:         PAGE,
    title:       'Crop PDF Online Free — Trim Margins & Whitespace',
    description: 'Drag a crop box to trim margins or whitespace from every PDF page. No upload.',
    images:      [{ url: `${BASE}/opengraph-image`, width: 1200, height: 630, alt: 'Crop PDF Online' }],
  },
  twitter: {
    title:       'Crop PDF Online Free',
    description: 'Trim margins or borders from any PDF. Browser-based, no upload needed.',
  },
};

const jsonLd = {
  '@context':          'https://schema.org',
  '@type':             'SoftwareApplication',
  name:                'Crop PDF',
  url:                 PAGE,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem:     'Any — runs in your web browser',
  description:
    'Free online PDF cropper. Drag an adjustable crop rectangle to trim margins, ' +
    'whitespace or unwanted borders from one page or every page. Runs entirely in your browser.',
  offers:   { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author:   { '@type': 'Person', name: 'Ritik Verma' },
  provider: { '@type': 'Organization', name: 'MyEasyPDF', url: BASE },
  featureList: [
    'Drag-and-resize crop rectangle with eight handles',
    'Apply crop to one page or every page',
    'Preserves PDF text quality — no rasterisation',
    '100% browser-based, no upload, no watermarks',
  ],
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',     item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Crop PDF', item: PAGE },
    ],
  },
};

export default function CropPDFPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CropPDFClient />
    </>
  );
}
