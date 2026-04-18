import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/fragments/Header';
import Footer from '@/components/fragments/Footer';

/* ─────────────────────────────────────────────
   Base domain — swap to production URL before deploy
───────────────────────────────────────────── */
const BASE = 'https://myeasypdf.com';
const OG_IMAGE = `${BASE}/og-image.png`;

/* ─────────────────────────────────────────────
   Viewport (separate export — Next.js 15+ requirement)
───────────────────────────────────────────── */
export const viewport: Viewport = {
  themeColor: '#5b5ef4',
  width: 'device-width',
  initialScale: 1,
};

/* ─────────────────────────────────────────────
   Root metadata  (every page inherits + overrides)
───────────────────────────────────────────── */
export const metadata: Metadata = {
  /* ── Base URL so relative URLs in metadata resolve correctly ── */
  metadataBase: new URL(BASE),

  /* ── Title template — each page sets title, brand appended automatically ── */
  title: {
    default: 'MyEasyPDF — Free Online PDF Tools',
    template: '%s | MyEasyPDF',
  },

  /* ── Default description (overridden per page) ── */
  description:
    'Free PDF tools that run entirely in your browser — no uploads, no account, 100% private. ' +
    'Convert images to PDF, merge, split, rotate PDFs, sign PDFs, extract pages as images.',

  /* ── Keywords (overridden per page) ── */
  keywords: [
    'free PDF tools', 'merge PDF online', 'image to PDF', 'split PDF',
    'rotate PDF', 'PDF to image', 'sign PDF online', 'convert PDF free',
    'browser PDF tools', 'no upload PDF', 'PDF converter online free',
    'myeasypdf',
  ],

  /* ── Authorship / branding ── */
  authors:   [{ name: 'Ritik Verma', url: 'mailto:ritikverma210@gmail.com' }],
  creator:   'Ritik Verma',
  publisher: 'MyEasyPDF',

  /* ── Canonical / alternates ── */
  alternates: { canonical: '/' },

  /* ── Robots ── */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  /* ── Open Graph ── */
  openGraph: {
    type:      'website',
    siteName:  'MyEasyPDF',
    locale:    'en_US',
    url:       BASE,
    title:     'MyEasyPDF — Free Online PDF Tools',
    description:
      'Free browser-based PDF tools. No uploads, no accounts, 100% private. ' +
      'Merge, split, rotate, sign PDFs and convert images to PDF — all in your browser.',
    images: [
      {
        url:    OG_IMAGE,
        width:  1200,
        height: 630,
        alt:    'MyEasyPDF — Free Online PDF Tools',
        type:   'image/png',
      },
    ],
  },

  /* ── Twitter / X Card ── */
  twitter: {
    card:        'summary_large_image',
    site:        '@myeasypdf',
    creator:     '@ritikvermaofficial',
    title:       'MyEasyPDF — Free Online PDF Tools',
    description: 'Free browser-based PDF tools. No uploads, no accounts, 100% private.',
    images:      [OG_IMAGE],
  },

  /* ── Verification placeholders (fill in after registering) ── */
  verification: {
    google: 'REPLACE_WITH_GOOGLE_SITE_VERIFICATION_TOKEN',
    // bing: 'REPLACE_WITH_BING_VERIFICATION_TOKEN',
  },

  /* ── App-related meta ── */
  applicationName: 'MyEasyPDF',
  category:        'Productivity',

  /* ── Icons — app/icon.svg is auto-detected by Next.js App Router and
     injected as <link rel="icon" type="image/svg+xml">, which modern
     browsers prefer over favicon.ico.                                 ── */
  icons: {
    icon:       [{ url: '/icon.svg', type: 'image/svg+xml' }],
    shortcut:   [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple:      [{ url: '/icon.svg', type: 'image/svg+xml' }],
  },
};

/* ─────────────────────────────────────────────
   Root layout
───────────────────────────────────────────── */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  /* ── Website-level JSON-LD (appears on every page) ── */
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type':    'WebSite',
    name:       'MyEasyPDF',
    url:        BASE,
    description:
      'Free online PDF tools that run entirely in your browser — no uploads, no account required.',
    author: {
      '@type': 'Person',
      name:    'Ritik Verma',
      email:   'ritikverma210@gmail.com',
    },
    potentialAction: {
      '@type':       'SearchAction',
      target:        `${BASE}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const orgSchema = {
    '@context':   'https://schema.org',
    '@type':      'Organization',
    name:         'MyEasyPDF',
    url:          BASE,
    logo:         `${BASE}/icon-192.png`,
    sameAs: [
      'mailto:ritikverma210@gmail.com',
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6502133214775091"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {/* Global structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />

        <div className="d-flex flex-column min-vh-100">
          <Header />
          <main className="flex-grow-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
