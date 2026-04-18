import RemovePagesClient from '@/components/pages/RemovePagesClient';

const BASE = 'https://myeasypdf.com';
const PAGE = `${BASE}/remove-pages`;

export const metadata = {
  title: 'Remove Pages from PDF Online Free — Delete PDF Pages',
  description:
    'Remove unwanted pages from your PDF online for free. ' +
    'Select pages to delete, preview thumbnails, and download the result instantly. ' +
    '100% browser-based — no upload to servers, no account required.',
  keywords: [
    'remove pages from PDF', 'delete PDF pages', 'PDF page remover',
    'remove page from PDF online free', 'delete pages PDF', 'PDF page delete tool',
    'remove PDF pages without uploading', 'browser PDF editor',
  ],
  alternates: { canonical: '/remove-pages' },
  openGraph: {
    url:         PAGE,
    title:       'Remove Pages from PDF Online Free',
    description: 'Select and delete unwanted pages from your PDF. No upload needed.',
    images:      [{ url: `${BASE}/og-image.png`, width: 1200, height: 630, alt: 'Remove PDF Pages Online' }],
  },
  twitter: {
    title:       'Remove Pages from PDF Free',
    description: 'Delete unwanted pages from your PDF online. 100% private, no upload.',
  },
};

const jsonLd = {
  '@context':          'https://schema.org',
  '@type':             'SoftwareApplication',
  name:                'Remove Pages from PDF',
  url:                 PAGE,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem:     'Any — runs in your web browser',
  description:
    'Free online tool to remove pages from a PDF. Select the pages you want to delete, ' +
    'preview them as thumbnails, and download the cleaned PDF instantly.',
  offers:   { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author:   { '@type': 'Person', name: 'Ritik Verma' },
  provider: { '@type': 'Organization', name: 'MyEasyPDF', url: BASE },
  featureList: [
    'Select pages to remove with thumbnail preview',
    'Keeps all other pages intact',
    '100% browser-based — no upload',
    'Instant download',
    'No watermarks added',
  ],
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',         item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Remove Pages', item: PAGE },
    ],
  },
};

export default function RemovePagesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <RemovePagesClient />
    </>
  );
}
