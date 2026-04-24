import AllPdfToolsClient from '@/components/pages/AllPdfToolsClient';

const BASE = 'https://myeasypdf.com';
const PAGE = `${BASE}/all-pdf-tools`;

export const metadata = {
  title: 'All PDF Tools — Free Online PDF Converter & Editor | MyEasyPDF',
  description: 'Browse all 16 free PDF tools on MyEasyPDF — JPG to PDF, PDF to JPG, merge, split, compress, rotate, sign, watermark, convert and more. No uploads, no account, 100% private.',
  keywords: ['all pdf tools', 'free pdf tools online', 'pdf converter', 'jpg to pdf', 'pdf to jpg', 'merge pdf', 'split pdf', 'compress pdf', 'sign pdf', 'rotate pdf', 'image to pdf'],
  alternates: { canonical: '/all-pdf-tools' },
  openGraph: {
    url: PAGE,
    title: 'All PDF Tools — Free Online | MyEasyPDF',
    description: '13 free browser-based PDF tools. No uploads, no account, always private.',
    images: [{ url: `${BASE}/og-image.png`, width: 1200, height: 630, alt: 'All PDF Tools — MyEasyPDF' }],
  },
};

export default function AllPdfToolsPage() {
  return <AllPdfToolsClient />;
}
