import type { Metadata } from 'next';
import HomePageClient from '@/components/pages/HomePageClient';

const BASE = 'https://myeasypdf.com';

export const metadata: Metadata = {
  title: 'Free Online PDF Tools — No Uploads, 100% Private',
  description:
    'Free PDF tools that work entirely in your browser — no uploads, no account, no watermarks. ' +
    'Merge, split, compress, watermark, sign PDFs, convert images, and more. 100% private.',
  keywords: [
    'free PDF tools online', 'PDF converter free', 'merge PDF online free',
    'image to PDF converter', 'split PDF online', 'sign PDF online',
    'compress PDF free', 'add watermark to PDF', 'remove pages from PDF',
    'PDF to image', 'no upload PDF tools', 'browser based PDF tools',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    url:         BASE,
    title:       'MyEasyPDF — Free Online PDF Tools. No Uploads.',
    description: 'Merge, split, sign PDFs and convert images to PDF — 100% in your browser.',
    images:      [{ url: `${BASE}/opengraph-image`, width: 1200, height: 630, alt: 'MyEasyPDF Tools' }],
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
    { '@type': 'ListItem', position: 1,  name: 'JPG to PDF Converter',   url: `${BASE}/jpg-to-pdf`        },
    { '@type': 'ListItem', position: 2,  name: 'PDF to JPG Converter',   url: `${BASE}/pdf-to-jpg`        },
    { '@type': 'ListItem', position: 3,  name: 'Image to PDF Converter', url: `${BASE}/image-to-pdf`      },
    { '@type': 'ListItem', position: 4,  name: 'Merge PDF',              url: `${BASE}/merge-pdf`         },
    { '@type': 'ListItem', position: 5,  name: 'PDF to Image',           url: `${BASE}/pdf-to-image`      },
    { '@type': 'ListItem', position: 6,  name: 'Split PDF',              url: `${BASE}/split-pdf`         },
    { '@type': 'ListItem', position: 7,  name: 'Sign PDF',               url: `${BASE}/sign-pdf`          },
    { '@type': 'ListItem', position: 8,  name: 'Camera to PDF',          url: `${BASE}/camera-to-pdf`     },
    { '@type': 'ListItem', position: 9,  name: 'Remove Pages from PDF',  url: `${BASE}/remove-pages`      },
    { '@type': 'ListItem', position: 10, name: 'Extract Pages from PDF', url: `${BASE}/extract-pages`     },
    { '@type': 'ListItem', position: 11, name: 'Organize PDF',           url: `${BASE}/organize-pdf`      },
    { '@type': 'ListItem', position: 12, name: 'Compress PDF',           url: `${BASE}/compress-pdf`      },
    { '@type': 'ListItem', position: 13, name: 'Add Watermark to PDF',   url: `${BASE}/add-watermark`     },
    { '@type': 'ListItem', position: 14, name: 'Add Page Numbers to PDF',url: `${BASE}/add-page-numbers`  },
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
