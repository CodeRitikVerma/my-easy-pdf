import SignPDFClient from '@/components/pages/SignPDFClient';

const BASE = 'https://myeasypdf.com';
const PAGE = `${BASE}/sign-pdf`;

export const metadata = {
  title: 'Sign PDF Online Free — Add Typed or Drawn Signature',
  description:
    'Add your signature to any PDF online for free — type it in a font or draw it by hand. ' +
    'Drag your signature anywhere on the page, resize it, and apply to multiple pages. ' +
    'No upload, no account, 100% browser-based.',
  keywords: [
    'sign PDF online free', 'add signature to PDF', 'digital signature PDF',
    'draw signature on PDF', 'electronic signature PDF free', 'type signature on PDF',
    'sign PDF without Adobe', 'free PDF signer online', 'handwritten signature PDF',
    'sign PDF no upload',
  ],
  alternates: { canonical: '/sign-pdf' },
  openGraph: {
    url:         PAGE,
    title:       'Sign PDF Online Free — Type or Draw Your Signature',
    description: 'Add a typed or hand-drawn signature to any PDF. Drag it anywhere. No upload needed.',
    images:      [{ url: `${BASE}/og-image.png`, width: 1200, height: 630, alt: 'Sign PDF Online' }],
  },
  twitter: {
    title:       'Sign PDF Online Free',
    description: 'Type or draw your signature and add it to any PDF. 100% private, no upload.',
  },
};

const jsonLd = {
  '@context':          'https://schema.org',
  '@type':             'SoftwareApplication',
  name:                'Sign PDF',
  url:                 PAGE,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem:     'Any — runs in your web browser',
  description:
    'Free online PDF signing tool. Type your signature in beautiful fonts or draw it freehand. ' +
    'Drag to position, resize with pinch or handle, apply to multiple pages. ' +
    'No upload — runs entirely in your browser.',
  offers:   { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author:   { '@type': 'Person', name: 'Ritik Verma' },
  provider: { '@type': 'Organization', name: 'MyEasyPDF', url: BASE },
  featureList: [
    'Type signature — 15+ handwriting fonts',
    'Draw signature freehand',
    'Custom ink color picker',
    'Drag to position on page',
    'Pinch or handle to resize',
    'Apply to multiple pages at once',
    '100% browser-based — no upload',
  ],
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',      item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Sign PDF',  item: PAGE },
    ],
  },
};

export default function SignPDFPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SignPDFClient />
    </>
  );
}
