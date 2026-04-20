const BASE = 'https://myeasypdf.com';

export default function sitemap() {
  const now = new Date();

  return [
    // ── Homepage ──
    { url: BASE,                          lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },

    // ── Tool pages ── (highest priority)
    { url: `${BASE}/image-to-pdf`,        lastModified: now, changeFrequency: 'monthly', priority: 0.95 },
    { url: `${BASE}/png-to-pdf`,          lastModified: now, changeFrequency: 'monthly', priority: 0.90 },
    { url: `${BASE}/merge-pdf`,           lastModified: now, changeFrequency: 'monthly', priority: 0.95 },
    { url: `${BASE}/pdf-to-image`,        lastModified: now, changeFrequency: 'monthly', priority: 0.95 },
    { url: `${BASE}/split-pdf`,           lastModified: now, changeFrequency: 'monthly', priority: 0.90 },
    { url: `${BASE}/rotate-pdf`,          lastModified: now, changeFrequency: 'monthly', priority: 0.90 },
    { url: `${BASE}/sign-pdf`,            lastModified: now, changeFrequency: 'monthly', priority: 0.90 },
    { url: `${BASE}/camera-to-pdf`,       lastModified: now, changeFrequency: 'monthly', priority: 0.85 },

    // ── New tool pages ──
    { url: `${BASE}/remove-pages`,        lastModified: now, changeFrequency: 'monthly', priority: 0.90 },
    { url: `${BASE}/extract-pages`,       lastModified: now, changeFrequency: 'monthly', priority: 0.90 },
    { url: `${BASE}/organize-pdf`,        lastModified: now, changeFrequency: 'monthly', priority: 0.88 },
    { url: `${BASE}/compress-pdf`,        lastModified: now, changeFrequency: 'monthly', priority: 0.88 },
    { url: `${BASE}/add-watermark`,       lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/add-page-numbers`,    lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/crop-pdf`,            lastModified: now, changeFrequency: 'monthly', priority: 0.88 },

    // ── Hub pages ──
    { url: `${BASE}/all-pdf-tools`,       lastModified: now, changeFrequency: 'monthly', priority: 0.80 },
    { url: `${BASE}/company`,             lastModified: now, changeFrequency: 'monthly', priority: 0.55 },

    // ── Info pages ──
    { url: `${BASE}/about`,               lastModified: now, changeFrequency: 'monthly', priority: 0.60 },
    { url: `${BASE}/faq`,                 lastModified: now, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE}/contact`,             lastModified: now, changeFrequency: 'yearly',  priority: 0.40 },
    { url: `${BASE}/privacy`,             lastModified: now, changeFrequency: 'yearly',  priority: 0.30 },
    { url: `${BASE}/terms`,               lastModified: now, changeFrequency: 'yearly',  priority: 0.30 },
    { url: `${BASE}/cookie-policy`,       lastModified: now, changeFrequency: 'yearly',  priority: 0.25 },
  ];
}
