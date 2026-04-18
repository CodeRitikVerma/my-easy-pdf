import ExtractPagesClient from '@/components/pages/ExtractPagesClient';

const BASE = 'https://myeasypdf.com';
const PAGE = `${BASE}/extract-pages`;

export const metadata = {
  title: 'Extract Pages from PDF Online Free — Save Selected Pages',
  description:
    'Extract specific pages from a PDF and save them as a new PDF online for free. ' +
    'Click thumbnails to select the pages you want to keep. 100% browser-based.',
  keywords: [
    'extract pages from PDF', 'save selected PDF pages', 'PDF page extractor',
    'extract PDF pages online free', 'keep specific pages PDF', 'PDF page saver',
    'extract pages without uploading', 'browser PDF extractor',
  ],
  alternates: { canonical: '/extract-pages' },
  openGraph: {
    url:         PAGE,
    title:       'Extract Pages from PDF Online Free',
    description: 'Select pages to keep and extract them into a new PDF. No upload needed.',
    images:      [{ url: `${BASE}/og-image.png`, width: 1200, height: 630, alt: 'Extract PDF Pages Online' }],
  },
  twitter: {
    title:       'Extract Pages from PDF Free',
    description: 'Keep only the pages you need. Extract to a new PDF. 100% private.',
  },
};

const jsonLd = {
  '@context':          'https://schema.org',
  '@type':             'SoftwareApplication',
  name:                'Extract Pages from PDF',
  url:                 PAGE,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem:     'Any — runs in your web browser',
  description:
    'Free online tool to extract specific pages from a PDF. ' +
    'Select the pages you want to keep via thumbnail preview and download the new PDF instantly.',
  offers:   { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author:   { '@type': 'Person', name: 'Ritik Verma' },
  provider: { '@type': 'Organization', name: 'MyEasyPDF', url: BASE },
  featureList: [
    'Select pages to extract with thumbnail preview',
    'Creates new PDF with only selected pages',
    '100% browser-based — no upload',
    'Instant download',
    'No watermarks added',
  ],
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',          item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Extract Pages', item: PAGE },
    ],
  },
};

export default function ExtractPagesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ExtractPagesClient />
    </>
  );
}
