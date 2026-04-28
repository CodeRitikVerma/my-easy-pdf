import CompanyPageClient from '@/components/pages/CompanyPageClient';

const BASE = 'https://myeasypdf.com';
const PAGE = `${BASE}/company`;

export const metadata = {
  title: 'Company — MyEasyPDF',
  description: 'Learn about MyEasyPDF — our mission to provide free, private, browser-based PDF tools. Meet the developer, read our policies, and get in touch.',
  alternates: { canonical: '/company' },
  openGraph: {
    url: PAGE,
    title: 'Company — MyEasyPDF',
    description: 'Free, private PDF tools built with care. Learn about our mission, values, and policies.',
    images: [{ url: `${BASE}/opengraph-image`, width: 1200, height: 630, alt: 'MyEasyPDF Company' }],
  },
};

export default function CompanyPage() {
  return <CompanyPageClient />;
}
