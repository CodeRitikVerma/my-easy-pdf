import CompressPDFClient from '@/components/pages/CompressPDFClient';

const BASE = 'https://myeasypdf.com';
const PAGE = `${BASE}/compress-pdf`;

export const metadata = {
  title: 'Compress PDF Online Free — Reduce PDF File Size Instantly',
  description:
    'Make your PDF smaller online for free. Choose High, Medium, or Low quality — or set an exact target size like 500 KB. ' +
    'See the file size savings instantly. No upload, no sign-up, 100% private.',
  keywords: [
    'compress PDF online free', 'reduce PDF file size', 'PDF compressor online',
    'shrink PDF free', 'make PDF smaller', 'compress PDF without uploading',
    'PDF size reducer', 'compress PDF to 1 MB', 'compress PDF no sign up',
  ],
  alternates: { canonical: '/compress-pdf' },
  openGraph: {
    url:         PAGE,
    title:       'Compress PDF Online Free — Reduce File Size',
    description: 'Reduce PDF file size with High, Medium, or Low quality. See savings. No upload.',
    images:      [{ url: `${BASE}/og-image.svg`, width: 1200, height: 630, alt: 'Compress PDF Online' }],
  },
  twitter: {
    title:       'Compress PDF Free',
    description: 'Reduce your PDF file size online. Choose quality level. 100% private.',
  },
};

const jsonLd = {
  '@context':          'https://schema.org',
  '@type':             'SoftwareApplication',
  name:                'Compress PDF',
  url:                 PAGE,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem:     'Any — runs in your web browser',
  description:
    'Free online PDF compressor. Reduce PDF file size by rendering pages as JPEG images ' +
    'at High (~70%), Medium (~45%), or Low (~25%) quality. Shows file size savings.',
  offers:   { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author:   { '@type': 'Person', name: 'Ritik Verma' },
  provider: { '@type': 'Organization', name: 'MyEasyPDF', url: BASE },
  featureList: [
    'Three quality presets: High, Medium, Low',
    'Shows original and compressed file sizes',
    'Displays savings percentage',
    '100% browser-based — no upload',
    'Instant download',
  ],
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',         item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Compress PDF', item: PAGE },
    ],
  },
};

export default function CompressPDFPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CompressPDFClient />
    </>
  );
}
