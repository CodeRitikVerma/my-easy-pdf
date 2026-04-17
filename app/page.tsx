import type { Metadata } from 'next';
import HomePageClient from '@/components/pages/HomePageClient';

const BASE = 'https://myeasypdf.com';

export const metadata: Metadata = {
  title: 'Free Online PDF Tools — No Uploads, 100% Private',
  description:
    'Free PDF tools that work entirely in your browser — no uploads, no account, no watermarks. ' +
    'Convert images to PDF, merge, split, sign PDFs, and extract pages. 100% private.',
  keywords: [
    'free PDF tools online', 'PDF converter free', 'merge PDF online free',
    'image to PDF converter', 'split PDF online', 'sign PDF online',
    'PDF to image', 'no upload PDF tools',
    'browser based PDF tools', 'privacy PDF converter',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    url:         BASE,
    title:       'MyEasyPDF — Free Online PDF Tools. No Uploads.',
    description: 'Merge, split, sign PDFs and convert images to PDF — 100% in your browser.',
    images:      [{ url: `${BASE}/og-image.png`, width: 1200, height: 630, alt: 'MyEasyPDF Tools' }],
  },
  twitter: {
    title:       'MyEasyPDF — Free Online PDF Tools. No Uploads.',
    description: 'Merge, split, sign PDFs — all free, all private, all in your browser.',
  },
};

/* ── Homepage JSON-LD: SoftwareApplication list ── */
const toolsSchema = {
  '@context': 'https://schema.org',
  '@type':    'ItemList',
  name:       'Free Online PDF Tools by MyEasyPDF',
  url:        BASE,
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Image to PDF Converter', url: `${BASE}/image-to-pdf`  },
    { '@type': 'ListItem', position: 2, name: 'Merge PDF',              url: `${BASE}/merge-pdf`     },
    { '@type': 'ListItem', position: 3, name: 'PDF to Image',           url: `${BASE}/pdf-to-image`  },
    { '@type': 'ListItem', position: 4, name: 'Split PDF',              url: `${BASE}/split-pdf`     },
    { '@type': 'ListItem', position: 5, name: 'Sign PDF',               url: `${BASE}/sign-pdf`      },
    { '@type': 'ListItem', position: 6, name: 'Camera to PDF',          url: `${BASE}/camera-to-pdf` },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolsSchema) }}
      />
      <HomePageClient />
    </>
  );
}
