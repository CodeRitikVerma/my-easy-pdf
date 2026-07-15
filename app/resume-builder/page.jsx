import ResumeBuilderClient from '@/components/pages/ResumeBuilderClient';

const BASE = 'https://myeasypdf.com';
const PAGE = `${BASE}/resume-builder`;

export const metadata = {
  title: 'Free Resume Builder — 20 Professional Templates, Download as PDF',
  description:
    'Build a stunning resume for free with 20 hand-crafted templates. ' +
    'Fill in your details, preview live, and download a perfect PDF instantly. ' +
    'No account required — everything runs in your browser.',
  keywords: [
    'free resume builder', 'resume maker online', 'resume templates', 'CV builder free',
    'professional resume creator', 'resume builder no sign up', 'download resume as PDF',
    'online CV maker', 'resume builder 2025', 'create resume online free',
  ],
  alternates: { canonical: '/resume-builder' },
  openGraph: {
    url:         PAGE,
    title:       'Free Resume Builder — 20 Templates, Instant PDF Download',
    description: 'Create a professional resume in minutes. 20 beautiful templates, live preview, PDF export. No sign-up needed.',
    images:      [{ url: `${BASE}/opengraph-image`, width: 1200, height: 630, alt: 'Resume Builder — MyEasyPDF' }],
  },
  twitter: {
    title:       'Free Resume Builder — 20 Pro Templates',
    description: 'Build your resume online for free. Beautiful templates, live preview, instant PDF download.',
  },
};

const jsonLd = {
  '@context':          'https://schema.org',
  '@type':             'SoftwareApplication',
  name:                'Free Resume Builder',
  url:                 PAGE,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem:     'Any — runs in your web browser',
  description:         'Create a professional resume from 20 templates. Fill your details, preview live, and download as PDF. Completely free and browser-based.',
  offers:   { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author:   { '@type': 'Person', name: 'Ritik Verma' },
  provider: { '@type': 'Organization', name: 'MyEasyPDF', url: BASE },
  featureList: [
    '20 professional resume templates',
    'Live preview as you type',
    'Personal Info, Summary, Experience, Education sections',
    'Skills, Projects, Certifications, Languages sections',
    'Download as PDF via browser print',
    '100% browser-based — no server upload',
    'No account or sign-up required',
  ],
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',           item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Resume Builder', item: PAGE },
    ],
  },
};

export default function ResumeBuilderPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ResumeBuilderClient />
    </>
  );
}
