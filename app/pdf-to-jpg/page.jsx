import PDFToImageClient from '@/components/pages/PDFToImageClient';

const BASE = 'https://myeasypdf.com';
const PAGE = `${BASE}/pdf-to-jpg`;

export const metadata = {
  title: 'PDF to JPG Converter — Free Online, No Upload, No Watermark',
  description:
    'Convert PDF pages to high-quality JPEG images online for free. Choose resolution (1×–4×), ' +
    'select which pages to export, and download a ZIP. 100% browser-based — your PDF is never uploaded.',
  keywords: [
    'PDF to JPG', 'PDF to JPEG', 'convert PDF to JPG free', 'PDF to JPG online',
    'PDF to JPEG converter', 'PDF to JPG no upload', 'PDF to JPG no watermark',
    'export PDF pages as JPEG', 'PDF page to image', 'convert PDF to JPG free online',
    'PDF to JPG high quality', 'PDF to image JPEG',
  ],
  alternates: { canonical: '/pdf-to-jpg' },
  openGraph: {
    url:         PAGE,
    title:       'PDF to JPG Converter — Free, Private, No Upload',
    description: 'Export PDF pages as JPEG images. Choose resolution, select pages, download ZIP. No upload needed.',
    images:      [{ url: `${BASE}/opengraph-image`, width: 1200, height: 630, alt: 'PDF to JPG Converter' }],
  },
  twitter: {
    title:       'PDF to JPG Converter — Free & Private',
    description: 'Turn PDF pages into JPEG images without uploading your file. 100% browser-based.',
  },
};

const jsonLd = {
  '@context':          'https://schema.org',
  '@type':             'SoftwareApplication',
  name:                'PDF to JPG Converter',
  url:                 PAGE,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem:     'Any — runs in your web browser',
  description:
    'Free online tool to convert PDF pages to JPEG images. ' +
    'Choose resolution scale (1×–4×), select specific pages, and download as individual JPEGs or a ZIP. ' +
    'Runs 100% in the browser using pdf.js — nothing is uploaded.',
  offers:   { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author:   { '@type': 'Person', name: 'Ritik Verma' },
  provider: { '@type': 'Organization', name: 'MyEasyPDF', url: BASE },
  featureList: [
    'Export PDF pages as JPEG images',
    'Resolution scale 1×–4× (96 DPI to 384 DPI)',
    'Select individual pages or export all',
    'Batch download as ZIP archive',
    '100% browser-based — no server upload',
    'No watermarks on exported images',
  ],
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',       item: BASE },
      { '@type': 'ListItem', position: 2, name: 'PDF to JPG', item: PAGE },
    ],
  },
};

export default function PDFToJpgPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PDFToImageClient
        slug="pdf-to-jpg"
        heading="PDF to JPG"
        subtitle="Export PDF pages as high-quality JPEG images"
        headingIcon="bi-file-earmark-image"
        defaultFormat="jpg"
      />
    </>
  );
}
