import ImageToPDFClient from '@/components/pages/ImageToPDFClient';

const BASE = 'https://myeasypdf.com';
const PAGE = `${BASE}/png-to-pdf`;

export const metadata = {
  title: 'PNG to PDF Converter — Free Online, No Upload, No Watermark',
  description:
    'Convert PNG images to a single PDF online — completely free. Preserves transparency, ' +
    'supports multiple PNGs, choose page size (A4, Letter) and orientation. Runs entirely in ' +
    'your browser — your files are never uploaded to any server.',
  keywords: [
    'PNG to PDF', 'convert PNG to PDF', 'PNG to PDF online', 'PNG to PDF free',
    'PNG to PDF converter', 'PNG to PDF no watermark', 'multiple PNG to PDF',
    'PNG to PDF without uploading', 'combine PNG images to PDF', 'PNG image to PDF',
  ],
  alternates: { canonical: '/png-to-pdf' },
  openGraph: {
    url:         PAGE,
    title:       'PNG to PDF Converter — Free, Private, No Upload',
    description: 'Convert one or many PNG images into a PDF directly in your browser. Free forever, no watermark, no account.',
    images:      [{ url: `${BASE}/opengraph-image`, width: 1200, height: 630, alt: 'PNG to PDF Converter' }],
  },
  twitter: {
    title:       'PNG to PDF Converter — Free & Private',
    description: 'Turn PNG images into a PDF without uploading them anywhere. 100% browser-based.',
  },
};

const jsonLd = {
  '@context':          'https://schema.org',
  '@type':             'SoftwareApplication',
  name:                'PNG to PDF Converter',
  url:                 PAGE,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem:     'Any — runs in your web browser',
  description:
    'Free online tool to convert PNG images into a PDF file. Supports multiple PNGs, ' +
    'preserves transparency, and lets you choose page size, orientation and margins. ' +
    'Runs 100% in the browser — nothing is uploaded.',
  offers:   { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author:   { '@type': 'Person', name: 'Ritik Verma' },
  provider: { '@type': 'Organization', name: 'MyEasyPDF', url: BASE },
  featureList: [
    'Convert one or many PNG files to PDF',
    'Preserves transparency where possible',
    'Page sizes: A4, A3, Letter, Legal, Image Size',
    'Portrait and landscape orientation',
    'Custom margin control',
    'Drag-and-drop reordering of pages',
    '100% browser-based — no server upload',
  ],
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',        item: BASE },
      { '@type': 'ListItem', position: 2, name: 'PNG to PDF',  item: PAGE },
    ],
  },
};

const faqLd = {
  '@context': 'https://schema.org',
  '@type':    'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name:    'How do I convert a PNG to PDF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Drop one or more PNG files onto the converter, arrange them in the order you want, pick a page size and orientation, then click Convert. The PDF downloads instantly — nothing is uploaded.',
      },
    },
    {
      '@type': 'Question',
      name:    'Are my PNG files uploaded to a server?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'No. MyEasyPDF converts PNG to PDF entirely in your browser using JavaScript. Your images never leave your device.',
      },
    },
    {
      '@type': 'Question',
      name:    'Can I combine multiple PNG images into a single PDF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Yes. Drop as many PNGs as you like, reorder them by drag-and-drop, and the converter will stitch them into one PDF — one image per page.',
      },
    },
    {
      '@type': 'Question',
      name:    'Is the PNG to PDF converter really free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Yes, it is 100% free with no watermark, no account and no trial limit.',
      },
    },
  ],
};

export default function PngToPDFPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <ImageToPDFClient
        slug="png-to-pdf"
        heading="PNG to PDF"
        subtitle="Convert one or many PNG images into a single PDF — private, in your browser"
        headingIcon="bi-filetype-png"
      />
    </>
  );
}
