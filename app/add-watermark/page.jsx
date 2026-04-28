import AddWatermarkClient from '@/components/pages/AddWatermarkClient';

const BASE = 'https://myeasypdf.com';
const PAGE = `${BASE}/add-watermark`;

export const metadata = {
  title: 'Add Watermark to PDF Online Free — Custom Text, Opacity and Position',
  description:
    'Stamp a text watermark on every PDF page — free, no upload, no sign-up. Set the text, opacity, colour, size, and position. Live preview on every page before you download.',
  keywords: [
    'add watermark to PDF free', 'PDF watermark online', 'text watermark PDF',
    'stamp watermark on PDF', 'confidential watermark PDF', 'add watermark to PDF no upload',
    'PDF watermark tool free', 'custom watermark PDF online',
  ],
  alternates: { canonical: '/add-watermark' },
  openGraph: {
    url:         PAGE,
    title:       'Add Watermark to PDF Online Free',
    description: 'Add a diagonal text watermark to your PDF with custom opacity and color. No upload.',
    images:      [{ url: `${BASE}/og-image.svg`, width: 1200, height: 630, alt: 'Add Watermark to PDF' }],
  },
  twitter: {
    title:       'Add Watermark to PDF Free',
    description: 'Watermark your PDF with custom text, opacity and color. 100% private.',
  },
};

const jsonLd = {
  '@context':          'https://schema.org',
  '@type':             'SoftwareApplication',
  name:                'Add Watermark to PDF',
  url:                 PAGE,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem:     'Any — runs in your web browser',
  description:
    'Free online PDF watermark tool. Add diagonal text watermarks to every page of your PDF. ' +
    'Customize opacity (10–80%), font size, and color.',
  offers:   { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author:   { '@type': 'Person', name: 'Ritik Verma' },
  provider: { '@type': 'Organization', name: 'MyEasyPDF', url: BASE },
  featureList: [
    'Custom watermark text',
    'Adjustable opacity (10–80%)',
    'Adjustable font size',
    'Color presets (gray, red, blue)',
    '100% browser-based — no upload',
  ],
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',          item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Add Watermark', item: PAGE },
    ],
  },
};

export default function AddWatermarkPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AddWatermarkClient />
    </>
  );
}
