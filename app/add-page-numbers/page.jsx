import AddPageNumbersClient from '@/components/pages/AddPageNumbersClient';

const BASE = 'https://myeasypdf.com';
const PAGE = `${BASE}/add-page-numbers`;

export const metadata = {
  title: 'Add Page Numbers to PDF Online Free — Any Position, Instant Preview',
  description:
    'Insert page numbers into any PDF — free, no sign-up, nothing uploaded. Pick position (top/bottom, left/centre/right), start number, font size, and margin. Live preview before downloading.',
  keywords: [
    'add page numbers to PDF free', 'number PDF pages online', 'PDF page numbering online',
    'insert page numbers in PDF free', 'add page numbers to PDF no upload',
    'PDF numbering tool free', 'number pages in PDF free', 'PDF page number generator',
  ],
  alternates: { canonical: '/add-page-numbers' },
  openGraph: {
    url:         PAGE,
    title:       'Add Page Numbers to PDF Online Free',
    description: 'Number your PDF pages with custom position, font size and margin. No upload.',
    images:      [{ url: `${BASE}/og-image.svg`, width: 1200, height: 630, alt: 'Add Page Numbers to PDF' }],
  },
  twitter: {
    title:       'Add Page Numbers to PDF Free',
    description: 'Add customizable page numbers to your PDF. 100% private, browser-based.',
  },
};

const jsonLd = {
  '@context':          'https://schema.org',
  '@type':             'SoftwareApplication',
  name:                'Add Page Numbers to PDF',
  url:                 PAGE,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem:     'Any — runs in your web browser',
  description:
    'Free online tool to add page numbers to a PDF. ' +
    'Customize position (bottom/top, center/right), starting number, font size, and margin.',
  offers:   { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author:   { '@type': 'Person', name: 'Ritik Verma' },
  provider: { '@type': 'Organization', name: 'MyEasyPDF', url: BASE },
  featureList: [
    'Choose page number position (4 options)',
    'Custom starting number',
    'Adjustable font size and margin',
    '100% browser-based — no upload',
    'Instant download',
  ],
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',             item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Add Page Numbers', item: PAGE },
    ],
  },
};

export default function AddPageNumbersPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AddPageNumbersClient />
    </>
  );
}
