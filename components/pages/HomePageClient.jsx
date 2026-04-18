'use client';
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Link from 'next/link';
import useIsMobile from '@/hooks/useIsMobile';

/* ─────────────────────────────────────────
   Hero SVG Illustration  (v2 — refined)
───────────────────────────────────────── */
function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 520 490"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 'auto', display: 'block' }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="blobGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#ede9fe" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#fce7f3" stopOpacity="0"   />
        </radialGradient>
        <radialGradient id="blobGrad2" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#e0e7ff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#e0e7ff" stopOpacity="0"   />
        </radialGradient>
        <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#6366f1" floodOpacity="0.11" />
        </filter>
        <filter id="screenShadow" x="-8%" y="-8%" width="116%" height="116%">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#00000026" />
        </filter>
      </defs>

      {/* ── Background blobs ── */}
      <ellipse cx="285" cy="255" rx="205" ry="200" fill="url(#blobGrad)" />
      <ellipse cx="285" cy="255" rx="148" ry="144" fill="url(#blobGrad2)" />

      {/* ── Decorative dots ── */}
      <circle cx="106" cy="70"  r="7"   fill="#818cf8" opacity="0.20" />
      <circle cx="128" cy="55"  r="4.5" fill="#c084fc" opacity="0.26" />
      <circle cx="86"  cy="88"  r="4"   fill="#f472b6" opacity="0.20" />
      <circle cx="400" cy="58"  r="6"   fill="#818cf8" opacity="0.16" />
      <circle cx="420" cy="43"  r="4"   fill="#34d399" opacity="0.26" />
      <circle cx="464" cy="180" r="8"   fill="#fbbf24" opacity="0.17" />
      <circle cx="480" cy="198" r="4.5" fill="#818cf8" opacity="0.20" />
      <circle cx="46"  cy="198" r="5.5" fill="#34d399" opacity="0.18" />
      <circle cx="62"  cy="213" r="3.5" fill="#f472b6" opacity="0.20" />
      <circle cx="150" cy="390" r="4.5" fill="#a78bfa" opacity="0.18" />
      <circle cx="430" cy="400" r="5"   fill="#818cf8" opacity="0.15" />

      {/* ── Desk ── */}
      <rect x="55"  y="368" width="410" height="15" rx="7.5" fill="#c4b5fd" opacity="0.65" />
      <rect x="98"  y="383" width="11"  height="75" rx="5.5" fill="#a78bfa" opacity="0.40" />
      <rect x="411" y="383" width="11"  height="75" rx="5.5" fill="#a78bfa" opacity="0.40" />

      {/* ── Laptop hinge / base ── */}
      <path d="M 145 368 L 160 368 L 155 350 L 365 350 L 360 368 L 375 368 L 382 376 L 138 376 Z"
        fill="#c4b5fd" opacity="0.72" />
      <rect x="148" y="368" width="224" height="5" rx="2.5" fill="#a78bfa" opacity="0.50" />

      {/* ── Laptop screen ── */}
      <rect x="156" y="205" width="208" height="148" rx="10"
        fill="white" stroke="#d8d4fe" strokeWidth="2" filter="url(#screenShadow)" />

      {/* Screen background */}
      <rect x="164" y="213" width="192" height="130" rx="6" fill="#f5f3ff" />

      {/* Toolbar bar */}
      <rect x="164" y="213" width="192" height="22" rx="6" fill="#6366f1" opacity="0.85" />
      <circle cx="176" cy="224" r="4" fill="white" opacity="0.55" />
      <circle cx="189" cy="224" r="4" fill="white" opacity="0.55" />
      <circle cx="202" cy="224" r="4" fill="white" opacity="0.55" />
      <rect x="216" y="218" width="50" height="12" rx="4" fill="white" opacity="0.15" />
      <rect x="272" y="218" width="30" height="12" rx="4" fill="white" opacity="0.12" />
      <rect x="308" y="218" width="30" height="12" rx="4" fill="white" opacity="0.12" />

      {/* PDF document on screen */}
      <rect x="174" y="242" width="68" height="90" rx="5"
        fill="white" stroke="#e0e7ff" strokeWidth="1" />
      <path d="M 218 242 L 242 242 L 242 256 L 218 256 Z" fill="#e0e7ff" />
      <path d="M 218 242 L 242 256 L 218 256 Z" fill="#c7d2fe" />
      <rect x="180" y="260" width="56" height="3"   rx="1.5"  fill="#818cf8" opacity="0.50" />
      <rect x="180" y="267" width="48" height="2.5" rx="1.25" fill="#c4b5fd" opacity="0.40" />
      <rect x="180" y="273" width="52" height="2.5" rx="1.25" fill="#c4b5fd" opacity="0.40" />
      <rect x="180" y="279" width="40" height="2.5" rx="1.25" fill="#c4b5fd" opacity="0.35" />
      <rect x="180" y="288" width="56" height="2.5" rx="1.25" fill="#818cf8" opacity="0.35" />
      <rect x="180" y="294" width="44" height="2.5" rx="1.25" fill="#c4b5fd" opacity="0.30" />
      <rect x="180" y="300" width="50" height="2.5" rx="1.25" fill="#c4b5fd" opacity="0.28" />
      <rect x="180" y="314" width="48" height="14" rx="4"    fill="#6366f1" opacity="0.65" />

      {/* Right panel on screen */}
      <rect x="252" y="242" width="96" height="90" rx="5" fill="#eef2ff" />
      <rect x="258" y="250" width="84" height="8"  rx="3"  fill="#c7d2fe" opacity="0.7" />
      <rect x="258" y="262" width="60" height="6"  rx="2.5" fill="#c4b5fd" opacity="0.5" />
      <rect x="258" y="272" width="70" height="6"  rx="2.5" fill="#c4b5fd" opacity="0.45" />
      <rect x="258" y="282" width="55" height="6"  rx="2.5" fill="#c4b5fd" opacity="0.40" />
      <rect x="258" y="298" width="84" height="26" rx="5"  fill="#6366f1" opacity="0.18" />
      <rect x="266" y="305" width="40" height="12" rx="4"  fill="#6366f1" opacity="0.6" />

      {/* ── Chair ── */}
      <rect x="222" y="292" width="104" height="68" rx="9" fill="#818cf8" opacity="0.18" />
      <rect x="236" y="356" width="12"  height="18" rx="5" fill="#a78bfa" opacity="0.35" />
      <rect x="300" y="356" width="12"  height="18" rx="5" fill="#a78bfa" opacity="0.35" />

      {/* ── Lower body ── */}
      <path d="M 226 304 L 215 368 L 248 368 L 270 320 L 292 368 L 325 368 L 314 304 Z"
        fill="#6366f1" opacity="0.82" />

      {/* ── Blouse / top ── */}
      <path d="M 232 294 Q 240 275 260 272 L 280 272 Q 300 275 308 294 L 314 304 L 226 304 Z"
        fill="#818cf8" />
      {/* Collar */}
      <path d="M 260 272 L 270 285 L 280 272" stroke="white" strokeWidth="2"
        fill="none" strokeLinecap="round" />
      {/* Blazer lapels */}
      <path d="M 246 294 L 238 304 L 226 304 L 232 294" fill="#6366f1" opacity="0.5" />
      <path d="M 294 294 L 302 304 L 314 304 L 308 294" fill="#6366f1" opacity="0.5" />

      {/* ── Neck ── */}
      <rect x="262" y="257" width="16" height="18" rx="6" fill="#fbbf8a" />

      {/* ── Head ── */}
      <circle cx="270" cy="230" r="28" fill="#fbbf8a" />

      {/* ── Hair ── */}
      <ellipse cx="270" cy="209" rx="31" ry="19" fill="#2d1b69" />
      <ellipse cx="246" cy="223" rx="12" ry="23" fill="#2d1b69" />
      <ellipse cx="294" cy="223" rx="12" ry="23" fill="#2d1b69" />
      {/* Long strand on left */}
      <path d="M 242 216 Q 232 250 236 272" stroke="#2d1b69" strokeWidth="21"
        strokeLinecap="round" fill="none" />
      {/* Highlight streak */}
      <path d="M 262 202 Q 268 198 274 202" stroke="#4c3499" strokeWidth="3"
        strokeLinecap="round" fill="none" opacity="0.5" />

      {/* ── Face ── */}
      {/* Eyes */}
      <ellipse cx="261" cy="229" rx="3" ry="3.2" fill="#3b2314" />
      <ellipse cx="279" cy="229" rx="3" ry="3.2" fill="#3b2314" />
      {/* Eye shine */}
      <circle cx="262.5" cy="228" r="1" fill="white" opacity="0.8" />
      <circle cx="280.5" cy="228" r="1" fill="white" opacity="0.8" />
      {/* Eyebrows */}
      <path d="M 257 222 Q 261 220 265 222" stroke="#3b2314" strokeWidth="1.5"
        fill="none" strokeLinecap="round" />
      <path d="M 275 222 Q 279 220 283 222" stroke="#3b2314" strokeWidth="1.5"
        fill="none" strokeLinecap="round" />
      {/* Nose */}
      <path d="M 268 232 Q 270 236 272 232" stroke="#e0a070" strokeWidth="1.2"
        fill="none" strokeLinecap="round" opacity="0.6" />
      {/* Smile */}
      <path d="M 263 239 Q 270 245 277 239" stroke="#c97070" strokeWidth="1.8"
        fill="none" strokeLinecap="round" />
      {/* Blush */}
      <ellipse cx="254" cy="234" rx="6" ry="3.5" fill="#f9a0a0" opacity="0.28" />
      <ellipse cx="286" cy="234" rx="6" ry="3.5" fill="#f9a0a0" opacity="0.28" />
      {/* Glasses */}
      <rect x="254" y="224" width="12" height="8" rx="3.5"
        fill="none" stroke="#6366f1" strokeWidth="1.3" opacity="0.65" />
      <rect x="274" y="224" width="12" height="8" rx="3.5"
        fill="none" stroke="#6366f1" strokeWidth="1.3" opacity="0.65" />
      <line x1="266" y1="228" x2="274" y2="228"
        stroke="#6366f1" strokeWidth="1.3" opacity="0.65" />
      {/* Temple arms */}
      <line x1="254" y1="228" x2="248" y2="230"
        stroke="#6366f1" strokeWidth="1.2" opacity="0.5" />
      <line x1="286" y1="228" x2="292" y2="230"
        stroke="#6366f1" strokeWidth="1.2" opacity="0.5" />

      {/* ── Arms ── */}
      <path d="M 237 296 Q 216 314 210 338" stroke="#fbbf8a" strokeWidth="14"
        strokeLinecap="round" fill="none" />
      <ellipse cx="208" cy="344" rx="11" ry="8" fill="#fbbf8a" />
      <path d="M 303 296 Q 324 314 330 338" stroke="#fbbf8a" strokeWidth="14"
        strokeLinecap="round" fill="none" />
      <ellipse cx="332" cy="344" rx="11" ry="8" fill="#fbbf8a" />

      {/* ── Floating tool cards ── */}

      {/* Card 1 — Merge PDF */}
      <g className="hic-card" style={{ animationDelay: '0s' }} filter="url(#cardShadow)">
        <rect x="14"  y="96"  width="136" height="64" rx="14" fill="white" />
        <rect x="26"  y="108" width="34"  height="40" rx="8"  fill="#eef2ff" />
        <circle cx="43" cy="128" r="12" fill="#6366f1" opacity="0.12" />
        <circle cx="43" cy="128" r="6"  fill="#6366f1" />
        <text x="72" y="123" fontFamily="Inter,system-ui,sans-serif" fontSize="10.5" fontWeight="700" fill="#1e1b4b">Merge PDF</text>
        <text x="72" y="140" fontFamily="Inter,system-ui,sans-serif" fontSize="8.5"  fill="#9ca3af">Combine files</text>
      </g>

      {/* Card 2 — Split PDF */}
      <g className="hic-card" style={{ animationDelay: '0.45s' }} filter="url(#cardShadow)">
        <rect x="370" y="104" width="136" height="64" rx="14" fill="white" />
        <rect x="382" y="116" width="34"  height="40" rx="8"  fill="#fdf4ff" />
        <circle cx="399" cy="136" r="12" fill="#a78bfa" opacity="0.12" />
        <circle cx="399" cy="136" r="6"  fill="#a78bfa" />
        <text x="428" y="131" fontFamily="Inter,system-ui,sans-serif" fontSize="10.5" fontWeight="700" fill="#1e1b4b">Split PDF</text>
        <text x="428" y="148" fontFamily="Inter,system-ui,sans-serif" fontSize="8.5"  fill="#9ca3af">Extract pages</text>
      </g>

      {/* Card 3 — Sign PDF */}
      <g className="hic-card" style={{ animationDelay: '0.22s' }} filter="url(#cardShadow)">
        <rect x="4"   y="255" width="132" height="62" rx="14" fill="white" />
        <rect x="16"  y="267" width="32"  height="38" rx="8"  fill="#fff0f6" />
        <circle cx="32" cy="286" r="11" fill="#f472b6" opacity="0.12" />
        <circle cx="32" cy="286" r="5.5" fill="#f472b6" />
        <text x="60" y="281" fontFamily="Inter,system-ui,sans-serif" fontSize="10.5" fontWeight="700" fill="#1e1b4b">Sign PDF</text>
        <text x="60" y="297" fontFamily="Inter,system-ui,sans-serif" fontSize="8.5"  fill="#9ca3af">E-signature</text>
      </g>

      {/* Card 4 — Compress */}
      <g className="hic-card" style={{ animationDelay: '0.67s' }} filter="url(#cardShadow)">
        <rect x="384" y="252" width="132" height="62" rx="14" fill="white" />
        <rect x="396" y="264" width="32"  height="38" rx="8"  fill="#ecfdf5" />
        <circle cx="412" cy="283" r="11" fill="#34d399" opacity="0.12" />
        <circle cx="412" cy="283" r="5.5" fill="#34d399" />
        <text x="440" y="278" fontFamily="Inter,system-ui,sans-serif" fontSize="10.5" fontWeight="700" fill="#1e1b4b">Compress</text>
        <text x="440" y="294" fontFamily="Inter,system-ui,sans-serif" fontSize="8.5"  fill="#9ca3af">Reduce size</text>
      </g>

      {/* ── Floating PDF documents ── */}
      <g transform="translate(472,316) rotate(13)">
        <rect width="44" height="56" rx="5" fill="white" stroke="#e0e7ff" strokeWidth="1.5" />
        <path d="M 30 0 L 44 14 L 30 14 Z" fill="#e0e7ff" />
        <rect x="7" y="20" width="30" height="3"   rx="1.5"  fill="#818cf8" opacity="0.40" />
        <rect x="7" y="27" width="24" height="2.5" rx="1.25" fill="#c4b5fd" opacity="0.32" />
        <rect x="7" y="33" width="26" height="2.5" rx="1.25" fill="#c4b5fd" opacity="0.28" />
        <rect x="7" y="39" width="18" height="2.5" rx="1.25" fill="#c4b5fd" opacity="0.22" />
        <text x="7" y="52" fontFamily="Inter,system-ui,sans-serif" fontSize="7.5" fontWeight="700" fill="#818cf8">PDF</text>
      </g>
      <g transform="translate(6,374) rotate(-9)">
        <rect width="44" height="56" rx="5" fill="white" stroke="#fce7f3" strokeWidth="1.5" />
        <path d="M 30 0 L 44 14 L 30 14 Z" fill="#fce7f3" />
        <rect x="7" y="20" width="30" height="3"   rx="1.5"  fill="#f472b6" opacity="0.35" />
        <rect x="7" y="27" width="24" height="2.5" rx="1.25" fill="#fbcfe8" opacity="0.30" />
        <rect x="7" y="33" width="26" height="2.5" rx="1.25" fill="#fbcfe8" opacity="0.28" />
        <rect x="7" y="39" width="18" height="2.5" rx="1.25" fill="#fbcfe8" opacity="0.22" />
        <text x="7" y="52" fontFamily="Inter,system-ui,sans-serif" fontSize="7.5" fontWeight="700" fill="#f472b6">PDF</text>
      </g>
    </svg>
  );
}

/* ─────────────────────────────────────────
   Data
───────────────────────────────────────── */

const allTools = [
  {
    title: 'Merge PDF',
    desc:  'Combine multiple PDFs into a single file.',
    icon:  'bi-layers-fill',
    href:  '/merge-pdf',
    color: '#6366f1',
    bg:    'linear-gradient(135deg,#6366f1,#818cf8)',
    light: '#eef2ff',
  },
  {
    title: 'Split PDF',
    desc:  'Split into individual pages or custom ranges.',
    icon:  'bi-scissors',
    href:  '/split-pdf',
    color: '#8b5cf6',
    bg:    'linear-gradient(135deg,#7c3aed,#a78bfa)',
    light: '#f5f3ff',
  },
  {
    title: 'Compress PDF',
    desc:  'Shrink file size while keeping quality.',
    icon:  'bi-file-zip',
    href:  '/compress-pdf',
    color: '#10b981',
    bg:    'linear-gradient(135deg,#059669,#34d399)',
    light: '#ecfdf5',
  },
  {
    title: 'Image to PDF',
    desc:  'Turn JPG, PNG or WebP images into a PDF.',
    icon:  'bi-images',
    href:  '/image-to-pdf',
    color: '#f59e0b',
    bg:    'linear-gradient(135deg,#d97706,#fbbf24)',
    light: '#fffbeb',
  },
  {
    title: 'PDF to Image',
    desc:  'Export every page as PNG or JPEG.',
    icon:  'bi-card-image',
    href:  '/pdf-to-image',
    color: '#3b82f6',
    bg:    'linear-gradient(135deg,#2563eb,#60a5fa)',
    light: '#eff6ff',
  },
  {
    title: 'Sign PDF',
    desc:  'Add a typed or hand-drawn signature.',
    icon:  'bi-pen',
    href:  '/sign-pdf',
    color: '#ec4899',
    bg:    'linear-gradient(135deg,#db2777,#f472b6)',
    light: '#fdf2f8',
  },
  {
    title: 'Add Watermark',
    desc:  'Stamp text watermarks on every page.',
    icon:  'bi-droplet-fill',
    href:  '/add-watermark',
    color: '#f97316',
    bg:    'linear-gradient(135deg,#ea580c,#fb923c)',
    light: '#fff7ed',
  },
  {
    title: 'Organize PDF',
    desc:  'Drag to reorder, rotate or remove pages.',
    icon:  'bi-grid',
    href:  '/organize-pdf',
    color: '#14b8a6',
    bg:    'linear-gradient(135deg,#0d9488,#2dd4bf)',
    light: '#f0fdfa',
  },
  {
    title: 'Remove Pages',
    desc:  'Delete specific pages from a PDF.',
    icon:  'bi-file-earmark-x',
    href:  '/remove-pages',
    color: '#ef4444',
    bg:    'linear-gradient(135deg,#dc2626,#f87171)',
    light: '#fef2f2',
  },
  {
    title: 'Extract Pages',
    desc:  'Save selected pages as a new PDF.',
    icon:  'bi-file-earmark-arrow-down',
    href:  '/extract-pages',
    color: '#f97316',
    bg:    'linear-gradient(135deg,#ea580c,#fb923c)',
    light: '#fff7ed',
  },
  {
    title: 'Add Page Numbers',
    desc:  'Insert page numbers anywhere on the PDF.',
    icon:  'bi-list-ol',
    href:  '/add-page-numbers',
    color: '#84cc16',
    bg:    'linear-gradient(135deg,#65a30d,#a3e635)',
    light: '#f7fee7',
  },
  {
    title: 'Camera to PDF',
    desc:  'Snap photos and instantly make a PDF.',
    icon:  'bi-camera-fill',
    href:  '/camera-to-pdf',
    color: '#0ea5e9',
    bg:    'linear-gradient(135deg,#0284c7,#38bdf8)',
    light: '#f0f9ff',
    badge: 'Mobile',
  },
];

const steps = [
  {
    n:    '01',
    icon: 'bi-cursor-fill',
    title:'Pick a Tool',
    text: 'Choose from 12 free PDF and image tools — no account needed.',
  },
  {
    n:    '02',
    icon: 'bi-cloud-arrow-up-fill',
    title:'Add Your File',
    text: 'Drag & drop or tap to select a PDF or image from your device.',
  },
  {
    n:    '03',
    icon: 'bi-download',
    title:'Download Instantly',
    text: 'Everything runs in your browser. Get your result in seconds.',
  },
];

const features = [
  {
    icon:     'bi-shield-lock-fill',
    gradient: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
    glow:     'rgba(99,102,241,0.18)',
    title:    '100% Private',
    text:     'Files never leave your device. All processing happens locally in your browser — zero server uploads.',
  },
  {
    icon:     'bi-lightning-charge-fill',
    gradient: 'linear-gradient(135deg,#f59e0b,#f97316)',
    glow:     'rgba(245,158,11,0.18)',
    title:    'Instant Results',
    text:     'No queues, no waiting for uploads. Your device handles everything at full speed.',
  },
  {
    icon:     'bi-gift-fill',
    gradient: 'linear-gradient(135deg,#10b981,#06b6d4)',
    glow:     'rgba(16,185,129,0.18)',
    title:    'Always Free',
    text:     'No sign-up, no watermarks, no usage limits. Every tool is free to use forever.',
  },
];

/* ─────────────────────────────────────────
   Page
───────────────────────────────────────── */
export default function HomePageClient() {
  const isMobile = useIsMobile();

  return (
    <>
      {/* ══════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════ */}
      <section className="hero-section">
        <Container style={{ position: 'relative', zIndex: 1 }}>
          <Row className="align-items-center g-4 g-lg-5">

            {/* Left — text */}
            <Col xs={12} lg={6} className="py-3 py-lg-4">
              <h1
                className="fw-bold mb-3"
                style={{
                  fontSize: 'clamp(1.85rem, 4.5vw, 3rem)',
                  letterSpacing: '-0.04em',
                  lineHeight: 1.1,
                  color: '#1e1b4b',
                }}
              >
                All your PDF tools,{' '}
                <span className="hero-underline hero-gradient-text">free, fast &amp; private</span>
              </h1>

              <p style={{ fontSize: '1rem', lineHeight: 1.72, color: '#4b5563', maxWidth: 460, marginBottom: '1.4rem' }}>
                Merge, split, compress, sign PDFs and convert images — all directly
                in your browser. No uploads, no account, no cost. Ever.
              </p>

              {/* CTA buttons */}
              <div className="d-flex gap-3 mb-4">
                <Button
                  as={Link} href="/image-to-pdf" size="lg"
                  className="fw-bold d-inline-flex align-items-center justify-content-center gap-2"
                  style={{ borderRadius: 12, minHeight: 52, width: 180, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', border: 'none', fontSize: '1rem', color: 'white', boxShadow: '0 8px 28px rgba(99,102,241,0.38)', letterSpacing: '-0.01em' }}
                >
                  <i className="bi bi-rocket-takeoff-fill d-none d-lg-inline me-2" /> Get Started
                </Button>

                {isMobile ? (
                  <Button
                    as={Link} href="/camera-to-pdf" size="lg"
                    className="fw-semibold d-inline-flex align-items-center justify-content-center"
                    style={{ borderRadius: 12, minHeight: 52, width: 180, fontSize: '1rem', background: 'white', border: '2px solid #6366f1', color: '#6366f1' }}
                  >
                    <i className="bi bi-camera-fill d-none d-lg-inline me-2" /> Scan to PDF
                  </Button>
                ) : (
                  <Button
                    as={Link} href="/merge-pdf" size="lg"
                    className="fw-semibold d-inline-flex align-items-center justify-content-center"
                    style={{ borderRadius: 12, minHeight: 52, width: 180, fontSize: '1rem', background: 'white', border: '2px solid #6366f1', color: '#6366f1' }}
                  >
                    <i className="bi bi-file-earmark-plus-fill d-none d-lg-inline me-2" /> Create PDF
                  </Button>
                )}
              </div>

              {/* Feature pills — single row */}
              <div className="d-flex flex-wrap gap-2 mt-3">
                {[
                  { icon: 'bi-shield-fill-check',    color: '#10b981', bg: '#ecfdf5', text: 'Files never leave your device' },
                  { icon: 'bi-lightning-charge-fill', color: '#f59e0b', bg: '#fef9c3', text: 'Instant results'               },
                  { icon: 'bi-gift-fill',             color: '#6366f1', bg: '#eef2ff', text: 'Free forever'                  },
                ].map((f, i) => (
                  <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: f.bg, borderRadius: 100, padding: '0.28rem 0.75rem', fontSize: '0.78rem', fontWeight: 600, color: '#374151', whiteSpace: 'nowrap' }}>
                    <i className={`bi ${f.icon}`} style={{ color: f.color, fontSize: '0.72rem' }} />
                    {f.text}
                  </span>
                ))}
              </div>
            </Col>

            {/* Right — illustration */}
            <Col xs={12} lg={6} className="d-flex justify-content-center align-items-end" style={{ zIndex: 1 }}>
              <div className="hero-illustration-wrap w-100">
                <HeroIllustration />
              </div>
            </Col>
          </Row>
        </Container>
      </section>


      {/* ══════════════════════════════════════════
          3. ALL TOOLS GRID
      ══════════════════════════════════════════ */}
      <section id="all-tools" className="section-py" style={{ background: '#fff' }}>
        <Container>
          <div className="text-center mb-4 mb-md-5">
            <h2 className="fw-bold mb-2" style={{ color: '#1e1b4b', fontSize: 'clamp(1.5rem,3vw,2rem)' }}>
              All PDF &amp; Image Tools
            </h2>
            <p className="text-muted mb-0" style={{ maxWidth: 500, margin: '0 auto' }}>
              Everything you need — all free, all private, all running in your browser
            </p>
          </div>

          <Row className="g-3">
            {allTools.map((tool, i) => (
              <Col key={i} xs={6} sm={4} md={4} lg={3}>
                <Link href={tool.href} className="home-tool-card d-flex flex-column h-100">
                  <div className="htc-icon" style={{ background: tool.bg, boxShadow: `0 6px 16px ${tool.color}33` }}>
                    <i className={`bi ${tool.icon}`} style={{ fontSize: '1.35rem', color: '#fff' }} />
                  </div>
                  <div className="htc-title">{tool.title}</div>
                  <div className="htc-desc">{tool.desc}</div>
                  {tool.badge && (
                    <span style={{ display: 'inline-block', marginTop: 4, fontSize: '0.68rem', fontWeight: 700, color: tool.color, background: tool.light, border: `1px solid ${tool.color}33`, borderRadius: 100, padding: '1px 8px' }}>
                      {tool.badge}
                    </span>
                  )}
                  <div className="htc-arrow">
                    Open <i className="bi bi-arrow-right" />
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ══════════════════════════════════════════
          4. HOW IT WORKS
      ══════════════════════════════════════════ */}
      <section className="how-section section-py section-alt">
        <Container>
          <div className="text-center mb-4 mb-md-5">
            <h2 className="fw-bold mb-2" style={{ color: '#1e1b4b', fontSize: 'clamp(1.5rem,3vw,2rem)' }}>
              How It Works
            </h2>
            <p className="text-muted mb-0">Three steps, done in seconds</p>
          </div>

          <Row className="g-4 justify-content-center">
            {steps.map((step, i) => (
              <Col key={i} xs={12} sm={4} className="how-step position-relative">
                {/* connector line between steps */}
                {i < steps.length - 1 && <div className="how-connector" />}

                <div className="how-step-num">{step.n}</div>

                <div
                  style={{ width: 52, height: 52, borderRadius: 14, background: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.85rem' }}
                >
                  <i className={`bi ${step.icon}`} style={{ fontSize: '1.3rem', color: '#6366f1' }} />
                </div>
                <h5 className="fw-bold mb-2" style={{ color: '#1e1b4b' }}>{step.title}</h5>
                <p className="text-muted small mb-0" style={{ maxWidth: 220, margin: '0 auto' }}>{step.text}</p>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ══════════════════════════════════════════
          5. WHY MYEASYPDF — Feature cards
      ══════════════════════════════════════════ */}
      <section className="section-py" style={{ background: '#fff' }}>
        <Container>
          <div className="text-center mb-4 mb-md-5">
            <h2 className="fw-bold mb-2" style={{ color: '#1e1b4b', fontSize: 'clamp(1.5rem,3vw,2rem)' }}>
              Why MyEasyPDF?
            </h2>
            <p className="text-muted mb-0">Built with your privacy and convenience in mind</p>
          </div>

          <Row className="g-3 g-md-4">
            {features.map((f, i) => (
              <Col key={i} xs={12} md={4}>
                <div className="feature-card">
                  <div
                    style={{ width: 60, height: 60, borderRadius: 16, background: f.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', boxShadow: `0 8px 24px ${f.glow}` }}
                  >
                    <i className={`bi ${f.icon}`} style={{ fontSize: '1.6rem', color: '#fff' }} />
                  </div>
                  <h5 className="fw-bold mb-2" style={{ color: '#1e1b4b' }}>{f.title}</h5>
                  <p className="text-muted small mb-0" style={{ lineHeight: 1.7 }}>{f.text}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ══════════════════════════════════════════
          6. CTA BANNER
      ══════════════════════════════════════════ */}
      <section className="cta-section section-alt">
        <Container style={{ position: 'relative', zIndex: 1 }}>
          <div className="text-center">
            <div
              style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#eef2ff', border: '1px solid #c7d2fe', borderRadius: 100, padding: '0.32rem 1rem', fontSize: '0.76rem', fontWeight: 600, color: '#4f46e5', marginBottom: '1.25rem' }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', display: 'inline-block', boxShadow: '0 0 7px #34d399' }} />
              Free forever — no card required
            </div>

            <h2
              className="fw-bold mb-3"
              style={{ color: '#1e1b4b', fontSize: 'clamp(1.7rem,4vw,2.6rem)', letterSpacing: '-0.03em', lineHeight: 1.15 }}
            >
              Ready to work with PDFs?
            </h2>
            <p style={{ color: '#4b5563', fontSize: '1.05rem', maxWidth: 480, margin: '0 auto 2rem', lineHeight: 1.75 }}>
              Pick a tool and get started in seconds — 100&nbsp;% private,
              no sign-up, no watermarks.
            </p>

            <div className="d-flex gap-3 justify-content-center">
              <Button
                as={Link} href="/image-to-pdf" size="lg"
                className="fw-bold d-inline-flex align-items-center justify-content-center gap-2"
                style={{ borderRadius: 12, minHeight: 52, flex: 1, maxWidth: 200, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', border: 'none', color: '#ffffff', fontSize: '1rem', boxShadow: '0 8px 28px rgba(99,102,241,0.35)' }}
              >
                <i className="bi bi-rocket-takeoff-fill d-none d-lg-inline me-2" /> Get Started
              </Button>
              <Button
                as={Link} href="#all-tools" size="lg"
                className="fw-semibold d-inline-flex align-items-center justify-content-center"
                style={{ borderRadius: 12, minHeight: 52, flex: 1, maxWidth: 200, fontSize: '1rem', background: 'white', border: '2px solid #6366f1', color: '#6366f1' }}
              >
                <i className="bi bi-grid d-none d-lg-inline me-2" /> Browse Tools
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
