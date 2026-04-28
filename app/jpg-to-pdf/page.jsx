import ImageToPDFClient from '@/components/pages/ImageToPDFClient';

const BASE = 'https://myeasypdf.com';
const PAGE = `${BASE}/jpg-to-pdf`;

export const metadata = {
  title: 'JPG to PDF Converter — Free Online, No Upload, No Watermark',
  description:
    'Convert JPG and JPEG images to PDF online for free. Combine multiple photos into one PDF, ' +
    'choose page size (A4, Letter) and orientation. 100% browser-based — your photos are never uploaded.',
  keywords: [
    'JPG to PDF', 'JPEG to PDF', 'convert JPG to PDF free', 'JPG to PDF online',
    'JPG to PDF converter', 'JPEG to PDF converter', 'multiple JPG to PDF',
    'JPG to PDF no upload', 'JPG to PDF no watermark', 'combine JPG to PDF',
    'photo to PDF converter', 'convert JPEG to PDF free',
  ],
  alternates: { canonical: '/jpg-to-pdf' },
  openGraph: {
    url:         PAGE,
    title:       'JPG to PDF Converter — Free, Private, No Upload',
    description: 'Convert one or many JPG photos into a PDF directly in your browser. Free, no watermark, no account.',
    images:      [{ url: `${BASE}/og-image.svg`, width: 1200, height: 630, alt: 'JPG to PDF Converter' }],
  },
  twitter: {
    title:       'JPG to PDF Converter — Free & Private',
    description: 'Turn JPEG photos into a PDF without uploading them anywhere. 100% browser-based.',
  },
};

const jsonLd = {
  '@context':          'https://schema.org',
  '@type':             'SoftwareApplication',
  name:                'JPG to PDF Converter',
  url:                 PAGE,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem:     'Any — runs in your web browser',
  description:
    'Free online tool to convert JPG and JPEG images into a single PDF file. ' +
    'Supports multiple JPEGs, drag-to-reorder, A4/Letter/Legal page sizes, portrait & landscape. ' +
    'Runs 100% in the browser — nothing is uploaded.',
  offers:   { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author:   { '@type': 'Person', name: 'Ritik Verma' },
  provider: { '@type': 'Organization', name: 'MyEasyPDF', url: BASE },
  featureList: [
    'Convert JPG and JPEG images to PDF',
    'Combine multiple photos into a single PDF',
    'Page sizes: A4, A3, Letter, Legal, Fit to Image',
    'Portrait and landscape orientation',
    'Custom margin control',
    'Drag-and-drop reordering',
    '100% browser-based — no server upload',
    'No watermarks',
  ],
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',       item: BASE },
      { '@type': 'ListItem', position: 2, name: 'JPG to PDF', item: PAGE },
    ],
  },
};

export default function JpgToPDFPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ImageToPDFClient
        slug="jpg-to-pdf"
        heading="JPG to PDF"
        subtitle="Convert JPEG photos into a single PDF — private, in your browser"
        headingIcon="bi-image"
      />
    </>
  );
}
