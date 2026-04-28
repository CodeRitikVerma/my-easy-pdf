import RemovePagesClient from '@/components/pages/RemovePagesClient';

const BASE = 'https://myeasypdf.com';
const PAGE = `${BASE}/remove-pages`;

export const metadata = {
  title: 'Remove Pages from PDF Online Free — Delete Unwanted Pages Instantly',
  description:
    'Delete unwanted pages from your PDF — free, no sign-up, nothing uploaded. Click thumbnail previews to mark pages for removal, then download a clean new PDF in seconds.',
  keywords: [
    'remove pages from PDF free', 'delete PDF pages online', 'PDF page remover',
    'remove page from PDF online', 'delete pages from PDF free', 'cut pages from PDF',
    'remove PDF pages without uploading', 'free PDF page remover',
  ],
  alternates: { canonical: '/remove-pages' },
  openGraph: {
    url:         PAGE,
    title:       'Remove Pages from PDF Online Free',
    description: 'Select and delete unwanted pages from your PDF. No upload needed.',
    images:      [{ url: `${BASE}/opengraph-image`, width: 1200, height: 630, alt: 'Remove PDF Pages Online' }],
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
