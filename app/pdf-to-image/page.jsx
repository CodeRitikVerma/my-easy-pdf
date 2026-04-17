import PDFToImageClient from '@/components/pages/PDFToImageClient';

const BASE = 'https://myeasypdf.com';
const PAGE = `${BASE}/pdf-to-image`;

export const metadata = {
  title: 'PDF to Image Converter — Export Pages as PNG or JPEG Free',
  description:
    'Extract every page of a PDF as high-quality PNG or JPEG images for free. ' +
    'Choose resolution (1×–4×), select specific pages, download individually or as a ZIP. ' +
    'No upload — runs entirely in your browser.',
  keywords: [
    'PDF to image', 'PDF to JPG', 'PDF to PNG', 'convert PDF to image online free',
    'extract PDF pages as images', 'PDF page to JPEG', 'PDF to picture converter',
    'export PDF pages free', 'PDF to image without uploading',
  ],
  alternates: { canonical: '/pdf-to-image' },
  openGraph: {
    url:         PAGE,
    title:       'PDF to Image — Extract Pages as PNG or JPEG Free',
    description: 'Convert PDF pages to PNG or JPEG. Choose resolution. Download as ZIP. No upload.',
    images:      [{ url: `${BASE}/og-image.png`, width: 1200, height: 630, alt: 'PDF to Image Converter' }],
  },
  twitter: {
    title:       'PDF to Image Converter — Free & Private',
    description: 'Export PDF pages as high-res PNG or JPEG. No upload, no watermark.',
  },
};

const jsonLd = {
  '@context':          'https://schema.org',
  '@type':             'SoftwareApplication',
  name:                'PDF to Image Converter',
  url:                 PAGE,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem:     'Any — runs in your web browser',
  description:
    'Free online tool to convert PDF pages into PNG or JPEG images. ' +
    'Select specific pages, adjust resolution up to 4×, download as ZIP. No server upload.',
  offers:   { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author:   { '@type': 'Person', name: 'Ritik Verma' },
  provider: { '@type': 'Organization', name: 'MyEasyPDF', url: BASE },
  featureList: [
    'Export pages as PNG (lossless) or JPEG',
    'Resolution scale 1× to 4×',
    'Select individual pages to export',
    'Download all pages as ZIP',
    '100% browser-based — no upload',
  ],
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',          item: BASE },
      { '@type': 'ListItem', position: 2, name: 'PDF to Image',  item: PAGE },
    ],
  },
};

export default function PDFToImagePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PDFToImageClient />
    </>
  );
}
