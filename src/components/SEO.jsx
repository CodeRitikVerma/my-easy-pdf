import { Helmet } from 'react-helmet-async';

const SITE_NAME    = 'MyEasyPDF';
const SITE_URL     = 'https://myeasypdf.com';
const DEFAULT_DESC = 'Free online PDF tools — convert images to PDF, merge, split, rotate PDFs, and extract pages as images. Everything runs in your browser. No uploads. 100% private.';
const OG_IMAGE     = `${SITE_URL}/og-image.svg`;

/**
 * Drop this component at the top of any page to set SEO meta tags.
 *
 * @param {string}  title       – Page title (appended with " | MyEasyPDF")
 * @param {string}  description – Meta description (~150 chars)
 * @param {string}  canonical   – Path e.g. "/merge-pdf"  (default "/")
 * @param {string}  keywords    – Comma-separated keywords
 * @param {string}  image       – Absolute OG image URL (falls back to default)
 */
const SEO = ({ title, description = DEFAULT_DESC, canonical = '/', keywords, image }) => {
  const fullTitle  = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Free Online PDF Tools`;
  const canonicalUrl = `${SITE_URL}${canonical}`;
  const ogImage    = image || OG_IMAGE;

  return (
    <Helmet>
      {/* ── Primary ─────────────────────────────── */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />

      {/* ── Open Graph ──────────────────────────── */}
      <meta property="og:type"        content="website" />
      <meta property="og:site_name"   content={SITE_NAME} />
      <meta property="og:url"         content={canonicalUrl} />
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image"       content={ogImage} />
      <meta property="og:image:width"  content="1200" />
      <meta property="og:image:height" content="630" />

      {/* ── Twitter Card ────────────────────────── */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={ogImage} />
    </Helmet>
  );
};

export default SEO;
