const BASE = 'https://myeasypdf.com';

// Cache the sitemap for 24 hours (ISR) instead of regenerating on every request
export const revalidate = 86400;

// helper to create entry
const createUrl = (path, priority, changeFrequency, lastModified) => ({
  url: BASE + path,
  lastModified,
  changeFrequency,
  priority
});

export default function sitemap() {
  const now = new Date();

  return [
    // ── Homepage ──
    createUrl('', 1.0, 'weekly', now),

    // ── Core Tool Pages (HIGH priority) ──
    createUrl('/jpg-to-pdf', 0.97, 'monthly', now),
    createUrl('/pdf-to-jpg', 0.97, 'monthly', now),
    createUrl('/merge-pdf', 0.95, 'monthly', now),
    createUrl('/pdf-to-image', 0.90, 'monthly', now),
    createUrl('/image-to-pdf', 0.90, 'monthly', now),

    // ── Secondary Tool Pages ──
    createUrl('/png-to-pdf', 0.9, 'monthly', now),
    createUrl('/split-pdf', 0.9, 'monthly', now),
    createUrl('/rotate-pdf', 0.9, 'monthly', now),
    createUrl('/sign-pdf', 0.9, 'monthly', now),

    // ── Utility Tool Pages ──
    createUrl('/remove-pages', 0.9, 'monthly', now),
    createUrl('/extract-pages', 0.9, 'monthly', now),
    createUrl('/organize-pdf', 0.88, 'monthly', now),
    createUrl('/compress-pdf', 0.88, 'monthly', now),
    createUrl('/crop-pdf', 0.88, 'monthly', now),

    // ── Supporting Tool Pages ──
    createUrl('/add-watermark', 0.85, 'monthly', now),
    createUrl('/add-page-numbers', 0.85, 'monthly', now),
    createUrl('/camera-to-pdf', 0.85, 'monthly', now),

    // ── Hub Pages ──
    createUrl('/all-pdf-tools', 0.8, 'monthly', now),
    createUrl('/company', 0.55, 'monthly', now),

    // ── Info Pages ──
    createUrl('/about', 0.6, 'monthly', now),
    createUrl('/faq', 0.65, 'monthly', now),
    createUrl('/contact', 0.4, 'yearly', now),

    // ── Legal Pages ──
    createUrl('/privacy', 0.3, 'yearly', now),
    createUrl('/terms', 0.3, 'yearly', now),
    createUrl('/cookie-policy', 0.25, 'yearly', now)

    // ── Future SEO Pages (IMPORTANT for ranking) ──
    // Uncomment when created
    // createUrl('/blog', 0.75, 'weekly', now),
    // createUrl('/blog/merge-pdf-online-free', 0.80, 'monthly', now),
    // createUrl('/blog/compress-pdf-without-losing-quality', 0.80, 'monthly', now),
  ];
}
