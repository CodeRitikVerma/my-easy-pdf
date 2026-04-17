/**
 * MyEasyPDF — Central Colour Palette
 *
 * All colour values used across the application live here.
 * Import from this file instead of writing hex codes inline.
 *
 * CSS custom properties in App.css are kept in sync with these values.
 */

// ── Brand ─────────────────────────────────────────────────
export const primary     = '#5b5ef4';
export const primaryDark = '#4338ca';
export const secondary   = '#8b5cf6';
export const accent      = '#f43f5e';

// ── Text ──────────────────────────────────────────────────
export const text = {
  primary:   '#111827',   // gray-900 — headings, strong labels
  secondary: '#374151',   // gray-700 — body copy
  muted:     '#6b7280',   // gray-500 — captions, helper text
  subtle:    '#9ca3af',   // gray-400 — placeholders, disabled
  white:     '#ffffff',
  onDark:    'rgba(255,255,255,0.88)',
};

// ── Surfaces ──────────────────────────────────────────────
export const surface = {
  page:    '#fafafa',     // app background
  base:    '#ffffff',     // card / panel background
  raised:  '#f9fafb',     // slightly elevated surface
  overlay: '#f3f4f6',     // hover backgrounds, chip fills
  inset:   '#f8f9ff',     // tinted info panels
};

// ── Borders ───────────────────────────────────────────────
export const border = {
  default: '#e5e7eb',     // gray-200
  strong:  '#d1d5db',     // gray-300
  focus:   'rgba(91,94,244,0.18)',
};

// ── Indigo scale ──────────────────────────────────────────
export const indigo = {
  50:  '#eef2ff',
  100: '#e0e7ff',
  200: '#c7d2fe',
  300: '#a5b4fc',
  400: '#818cf8',
  500: '#6366f1',
  600: '#4f46e5',
  700: '#4338ca',
  800: '#3730a3',
  900: '#1e1b4b',
};

// ── Violet scale ──────────────────────────────────────────
export const violet = {
  400: '#a78bfa',
  500: '#8b5cf6',
  600: '#7c3aed',
};

// ── Status / semantic ─────────────────────────────────────
export const status = {
  success:  '#10b981',
  successBg:'#ecfdf5',
  warning:  '#f59e0b',
  warningBg:'#fffbeb',
  danger:   '#ef4444',
  dangerBg: '#fef2f2',
  info:     '#6366f1',
  infoBg:   '#eef2ff',
};

// ── Dark surfaces (footer, overlays) ─────────────────────
export const dark = {
  bg:     '#0f172a',
  bgDeep: '#0f0e1a',
  border: '#1e293b',
  muted:  '#64748b',
  dim:    '#475569',
  text:   '#94a3b8',
  light:  '#e2e8f0',
  bright: '#f1f5f9',
};

// ── Gradients ─────────────────────────────────────────────
export const gradient = {
  primary:   `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)`,
  hero:      'linear-gradient(135deg, #1e1b4b 0%, #4f46e5 50%, #7c3aed 100%)',
  navbar:    'linear-gradient(135deg, #2d2a8e 0%, #4f46e5 100%)',
  developer: `linear-gradient(135deg, ${primary}, ${accent})`,
  instagram: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
};

// ── Per-tool colours ──────────────────────────────────────
export const tools = {
  imageToPdf: {
    color:   '#6366f1',
    bg:      '#eef2ff',
    iconBg:  'linear-gradient(135deg, #6366f1, #818cf8)',
    shadow:  '#6366f133',
    badgeBorder: '#6366f133',
  },
  mergePdf: {
    color:   '#8b5cf6',
    bg:      '#f5f3ff',
    iconBg:  'linear-gradient(135deg, #8b5cf6, #a78bfa)',
    shadow:  '#8b5cf633',
    badgeBorder: '#8b5cf633',
  },
  pdfToImage: {
    color:   '#ec4899',
    bg:      '#fdf2f8',
    iconBg:  'linear-gradient(135deg, #ec4899, #f472b6)',
    shadow:  '#ec489933',
    badgeBorder: '#ec489933',
  },
  splitPdf: {
    color:   '#f59e0b',
    bg:      '#fffbeb',
    iconBg:  'linear-gradient(135deg, #f59e0b, #fbbf24)',
    shadow:  '#f59e0b33',
    badgeBorder: '#f59e0b33',
  },
  rotatePdf: {
    color:   '#10b981',
    bg:      '#ecfdf5',
    iconBg:  'linear-gradient(135deg, #10b981, #34d399)',
    shadow:  '#10b98133',
    badgeBorder: '#10b98133',
  },
  signPdf: {
    color:   '#0ea5e9',
    bg:      '#f0f9ff',
    iconBg:  'linear-gradient(135deg, #0ea5e9, #38bdf8)',
    shadow:  '#0ea5e933',
    badgeBorder: '#0ea5e933',
  },
  cameraPdf: {
    color:   '#ef4444',
    bg:      '#fef2f2',
    iconBg:  'linear-gradient(135deg, #ef4444, #f87171)',
    shadow:  '#ef444433',
    badgeBorder: '#ef444433',
  },
};

// ── Feature-section icon gradients ────────────────────────
export const featureGradients = {
  privacy:  'linear-gradient(135deg, #6366f1, #8b5cf6)',
  speed:    'linear-gradient(135deg, #f59e0b, #f97316)',
  free:     'linear-gradient(135deg, #10b981, #06b6d4)',
};

// ── Value-section icon colours (About page) ───────────────
export const values = {
  privacy:  indigo[500],
  free:     status.success,
  speed:    status.warning,
  craft:    secondary,
};

// Default export groups everything for convenience
const palette = {
  primary, primaryDark, secondary, accent,
  text, surface, border, indigo, violet,
  status, dark, gradient, tools, featureGradients, values,
};

export default palette;
