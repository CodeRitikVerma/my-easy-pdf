import FAQPageClient from '@/components/pages/FAQPageClient';

const BASE = 'https://myeasypdf.com';
const PAGE = `${BASE}/faq`;

export const metadata = {
  title: 'FAQ — MyEasyPDF Help & Common Questions',
  description:
    'Find answers to the most common questions about MyEasyPDF: privacy, file uploads, ' +
    'supported formats, page limits, and how each PDF tool works. 100% free, no account required.',
  keywords: [
    'MyEasyPDF FAQ', 'PDF tools help', 'PDF questions answers', 'how to merge PDF free',
    'PDF privacy questions', 'PDF no upload FAQ', 'MyEasyPDF how it works',
    'PDF tools browser based', 'PDF file size limit', 'PDF tools free no account',
  ],
  alternates: { canonical: '/faq' },
  openGraph: {
    url:         PAGE,
    title:       'FAQ — MyEasyPDF Help & Common Questions',
    description: 'Answers to common questions about privacy, formats, file size, and how MyEasyPDF tools work.',
    images:      [{ url: `${BASE}/og-image.svg`, width: 1200, height: 630, alt: 'MyEasyPDF FAQ' }],
  },
  twitter: {
    title:       'FAQ — MyEasyPDF Help',
    description: 'Common questions about privacy, formats, and how MyEasyPDF tools work. No uploads, no account.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type':    'FAQPage',
  name:       'MyEasyPDF FAQ',
  url:        PAGE,
  mainEntity: [
    {
      '@type':          'Question',
      name:             'Is MyEasyPDF really free?',
      acceptedAnswer:   { '@type': 'Answer', text: 'Yes — 100% free. No sign-up, no subscription, no watermarks, no hidden limits. Every tool is completely free to use, forever.' },
    },
    {
      '@type':          'Question',
      name:             'Do I need to create an account?',
      acceptedAnswer:   { '@type': 'Answer', text: 'No account needed. Just open the tool, upload your file, and download the result. That\'s it.' },
    },
    {
      '@type':          'Question',
      name:             'Are my files uploaded to a server?',
      acceptedAnswer:   { '@type': 'Answer', text: 'Never. All processing happens entirely inside your browser using JavaScript. Your files never leave your device — not even for a millisecond.' },
    },
    {
      '@type':          'Question',
      name:             'Can I use this for confidential documents?',
      acceptedAnswer:   { '@type': 'Answer', text: 'Yes. Because everything runs locally in your browser, your confidential PDFs, contracts, ID documents, and other sensitive files are never transmitted anywhere.' },
    },
    {
      '@type':          'Question',
      name:             'Is there a file size limit?',
      acceptedAnswer:   { '@type': 'Answer', text: 'There\'s no hard server-side limit since everything runs in your browser. Very large files (100 MB+) may be slow depending on your device\'s memory and CPU. For best performance, keep files under 50 MB.' },
    },
    {
      '@type':          'Question',
      name:             'Which browsers are supported?',
      acceptedAnswer:   { '@type': 'Answer', text: 'MyEasyPDF works best in modern browsers: Chrome, Edge, Firefox, and Safari. For the best experience, we recommend using the latest version of Chrome or Edge.' },
    },
    {
      '@type':          'Question',
      name:             'Which image formats are supported for Image to PDF?',
      acceptedAnswer:   { '@type': 'Answer', text: 'JPG, PNG, WebP, GIF, and BMP are all supported. WebP and GIF are automatically converted to PNG before embedding.' },
    },
    {
      '@type':          'Question',
      name:             'Can I split specific pages instead of every page?',
      acceptedAnswer:   { '@type': 'Answer', text: 'Yes. On the Split PDF page, choose "custom page ranges" and enter ranges like 1-3, 5, 7-9. Each range produces a separate PDF file, all bundled in a ZIP.' },
    },
    {
      '@type':          'Question',
      name:             'What image formats can I export PDF pages to?',
      acceptedAnswer:   { '@type': 'Answer', text: 'PNG (lossless, best quality) and JPEG (smaller file size). You can also adjust the resolution scale from 1× up to 4×.' },
    },
    {
      '@type':          'Question',
      name:             'Do you store or log my files?',
      acceptedAnswer:   { '@type': 'Answer', text: 'No. We have no access to your files at any point. We don\'t log file names, contents, or any processing data.' },
    },
  ],
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'FAQ',  item: PAGE },
    ],
  },
};

export default function FAQPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <FAQPageClient />
    </>
  );
}
