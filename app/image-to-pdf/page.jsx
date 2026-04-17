import ImageToPDFClient from '@/components/pages/ImageToPDFClient';

const BASE = 'https://myeasypdf.com';
const PAGE = `${BASE}/image-to-pdf`;

export const metadata = {
  title: 'Image to PDF Converter — Free, Instant, No Upload Required',
  description:
    'Convert JPG, PNG, WebP, GIF and BMP images to a single PDF online — completely free. ' +
    'Choose page size (A4, Letter), set orientation and margins. Works 100% in your browser, nothing uploaded.',
  keywords: [
    'image to PDF', 'JPG to PDF', 'PNG to PDF', 'convert image to PDF online free',
    'photo to PDF', 'picture to PDF converter', 'WebP to PDF', 'multiple images to PDF',
    'images to PDF free no watermark', 'convert photos to PDF without uploading',
  ],
  alternates: { canonical: '/image-to-pdf' },
  openGraph: {
    url:         PAGE,
    title:       'Image to PDF Converter — Free, No Upload',
    description: 'Convert JPG, PNG, WebP images to PDF online. Set page size and orientation. No upload needed.',
    images:      [{ url: `${BASE}/og-image.png`, width: 1200, height: 630, alt: 'Image to PDF Converter' }],
  },
  twitter: {
    title:       'Image to PDF Converter — Free & Private',
    description: 'Convert photos and images to PDF in your browser. No upload, no watermark.',
  },
};

const jsonLd = {
  '@context':          'https://schema.org',
  '@type':             'SoftwareApplication',
  name:                'Image to PDF Converter',
  url:                 PAGE,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem:     'Any — runs in your web browser',
  description:
    'Free online tool to convert JPG, PNG, WebP, and GIF images into a PDF file. ' +
    'Drag to reorder pages. Choose A4, A3, Letter, Legal or Image Size. No server upload.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author:  { '@type': 'Person', name: 'Ritik Verma' },
  provider: { '@type': 'Organization', name: 'MyEasyPDF', url: BASE },
  featureList: [
    'Supports JPG, PNG, WebP, GIF, BMP',
    'Multiple page size options: A4, A3, Letter, Legal, Image Size',
    'Portrait and landscape orientation',
    'Custom margin control',
    'Drag-and-drop reordering',
    '100% browser-based — no upload',
  ],
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',          item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Image to PDF',  item: PAGE },
    ],
  },
};

export default function ImageToPDFPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ImageToPDFClient />
    </>
  );
}
