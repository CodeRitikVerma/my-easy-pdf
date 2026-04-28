import ContactPageClient from '@/components/pages/ContactPageClient';

const BASE = 'https://myeasypdf.com';
const PAGE = `${BASE}/contact`;

export const metadata = {
  title: 'Contact MyEasyPDF — Bug Reports, Feature Requests & Support',
  description:
    'Get in touch with the MyEasyPDF developer. Report a bug, request a new feature, ' +
    'or ask for help. We typically respond within 24–48 hours.',
  keywords: [
    'contact MyEasyPDF', 'MyEasyPDF support', 'PDF tool bug report', 'PDF feature request',
    'Ritik Verma contact', 'MyEasyPDF help', 'MyEasyPDF feedback',
  ],
  alternates: { canonical: '/contact' },
  openGraph: {
    url:         PAGE,
    title:       'Contact MyEasyPDF — Support & Feedback',
    description: 'Report a bug, request a feature, or ask for help. We typically respond within 24–48 hours.',
    images:      [{ url: `${BASE}/og-image.svg`, width: 1200, height: 630, alt: 'Contact MyEasyPDF' }],
  },
  twitter: {
    title:       'Contact MyEasyPDF',
    description: 'Bug reports, feature requests, or general help — reach out to the MyEasyPDF developer.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type':    'ContactPage',
  name:       'Contact MyEasyPDF',
  url:        PAGE,
  description: 'Contact page for MyEasyPDF. Report bugs, request features, or ask for support.',
  mainEntity: {
    '@type':  'Organization',
    name:     'MyEasyPDF',
    url:      BASE,
    contactPoint: {
      '@type':             'ContactPoint',
      contactType:         'customer support',
      availableLanguage:   'English',
      description:         'Bug reports, feature requests, and general inquiries via contact form.',
    },
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',    item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: PAGE },
    ],
  },
};

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ContactPageClient />
    </>
  );
}
