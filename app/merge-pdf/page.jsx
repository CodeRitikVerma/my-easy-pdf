import MergePDFClient from '@/components/pages/MergePDFClient';

const BASE = 'https://myeasypdf.com';
const PAGE = `${BASE}/merge-pdf`;

export const metadata = {
  title: 'Merge PDF Files Online Free — Combine PDFs Instantly',
  description:
    'Combine multiple PDF files into one document online for free. ' +
    'Drag to reorder pages before merging. No file size limit, no upload to servers, no sign-up. ' +
    'Works 100% in your browser.',
  keywords: [
    'merge PDF online free', 'combine PDF files', 'join PDF online',
    'PDF combiner free', 'merge multiple PDF into one', 'combine PDF without uploading',
    'merge PDF free no limit', 'PDF merger tool online', 'unite PDF files',
  ],
  alternates: { canonical: '/merge-pdf' },
  openGraph: {
    url:         PAGE,
    title:       'Merge PDF Files Online — Free, No Upload',
    description: 'Combine multiple PDFs into one. Drag to reorder. No upload to servers.',
    images:      [{ url: `${BASE}/og-image.png`, width: 1200, height: 630, alt: 'Merge PDF Online' }],
  },
  twitter: {
    title:       'Merge PDF Files Free Online',
    description: 'Combine multiple PDFs into one document instantly. 100% private, no upload.',
  },
};

const jsonLd = {
  '@context':          'https://schema.org',
  '@type':             'SoftwareApplication',
  name:                'Merge PDF',
  url:                 PAGE,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem:     'Any — runs in your web browser',
  description:
    'Free online PDF merger. Combine any number of PDF files into one document. ' +
    'Drag to reorder, then download the merged PDF. No file upload required.',
  offers:   { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author:   { '@type': 'Person', name: 'Ritik Verma' },
  provider: { '@type': 'Organization', name: 'MyEasyPDF', url: BASE },
  featureList: [
    'Merge unlimited PDF files',
    'Drag-and-drop to reorder files',
    '100% browser-based — no upload',
    'No file size limit',
    'No watermarks added',
  ],
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',       item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Merge PDF',  item: PAGE },
    ],
  },
};

export default function MergePDFPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MergePDFClient />
    </>
  );
}
