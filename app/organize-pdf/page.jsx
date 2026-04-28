import OrganizePDFClient from '@/components/pages/OrganizePDFClient';

const BASE = 'https://myeasypdf.com';
const PAGE = `${BASE}/organize-pdf`;

export const metadata = {
  title: 'Organize PDF Pages Online Free — Drag to Reorder Pages Instantly',
  description:
    'Rearrange PDF pages in any order — free, no sign-up, nothing uploaded. Drag thumbnails to reorder, then download your reorganised PDF in seconds. 100% browser-based.',
  keywords: [
    'organize PDF pages free', 'reorder PDF pages online', 'rearrange PDF pages free',
    'drag to reorder PDF pages', 'PDF page organizer online', 'sort PDF pages free',
    'rearrange pages in PDF without uploading', 'free PDF organizer',
  ],
  alternates: { canonical: '/organize-pdf' },
  openGraph: {
    url:         PAGE,
    title:       'Organize PDF Pages Online Free',
    description: 'Reorder pages in your PDF by moving them up or down. No upload needed.',
    images:      [{ url: `${BASE}/og-image.svg`, width: 1200, height: 630, alt: 'Organize PDF Pages Online' }],
  },
  twitter: {
    title:       'Organize PDF Pages Free',
    description: 'Rearrange pages in your PDF in any order. 100% private, browser-based.',
  },
};

const jsonLd = {
  '@context':          'https://schema.org',
  '@type':             'SoftwareApplication',
  name:                'Organize PDF',
  url:                 PAGE,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem:     'Any — runs in your web browser',
  description:
    'Free online PDF page organizer. Reorder pages using up/down arrow buttons, ' +
    'preview thumbnails, and download the reorganized PDF instantly.',
  offers:   { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author:   { '@type': 'Person', name: 'Ritik Verma' },
  provider: { '@type': 'Organization', name: 'MyEasyPDF', url: BASE },
  featureList: [
    'Move pages up or down with arrow buttons',
    'Thumbnail preview of all pages',
    '100% browser-based — no upload',
    'Instant download',
    'No watermarks added',
  ],
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',        item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Organize PDF', item: PAGE },
    ],
  },
};

export default function OrganizePDFPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <OrganizePDFClient />
    </>
  );
}
