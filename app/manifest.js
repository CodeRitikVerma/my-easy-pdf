export default function manifest() {
  return {
    name: 'MyEasyPDF — Free Online PDF Tools',
    short_name: 'MyEasyPDF',
    description:
      'Free browser-based PDF tools. Merge, split, compress, sign, crop, rotate, convert — all private, no upload.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#5b5ef4',
    orientation: 'portrait-primary',
    categories: ['productivity', 'utilities', 'business'],
    lang: 'en',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' },
    ],
  };
}
