import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 — Page Not Found | MyEasyPDF',
  description: 'The page you are looking for could not be found. Go back to MyEasyPDF and use our free PDF tools.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  const tools = [
    { href: '/image-to-pdf',  icon: 'bi-images',          label: 'Image to PDF'    },
    { href: '/merge-pdf',     icon: 'bi-layers-fill',      label: 'Merge PDF'       },
    { href: '/split-pdf',     icon: 'bi-scissors',         label: 'Split PDF'       },
    { href: '/compress-pdf',  icon: 'bi-file-zip',         label: 'Compress PDF'    },
    { href: '/rotate-pdf',    icon: 'bi-arrow-clockwise',  label: 'Rotate PDF'      },
    { href: '/pdf-to-image',  icon: 'bi-card-image',       label: 'PDF to Image'    },
  ];

  return (
    <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem' }}>
      <div style={{ maxWidth: 560, width: '100%', textAlign: 'center' }}>

        {/* Big 404 */}
        <div style={{
          fontSize: 'clamp(5rem, 18vw, 8rem)', fontWeight: 800, lineHeight: 1,
          background: 'linear-gradient(135deg, #5b5ef4 0%, #8b5cf6 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          marginBottom: '0.5rem',
        }}>
          404
        </div>

        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem', color: '#111827' }}>
          Page not found
        </h1>
        <p style={{ color: '#6b7280', marginBottom: '2rem', lineHeight: 1.6 }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.<br />
          Try one of our free PDF tools below, or go back to the homepage.
        </p>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '10px 24px', borderRadius: 10, fontWeight: 600, fontSize: '0.9rem',
              background: 'linear-gradient(135deg, #5b5ef4 0%, #8b5cf6 100%)',
              color: '#fff', textDecoration: 'none', border: 'none',
            }}
          >
            <i className="bi bi-house-fill" /> Back to Home
          </Link>
          <Link
            href="/contact"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '10px 24px', borderRadius: 10, fontWeight: 600, fontSize: '0.9rem',
              background: '#fff', color: '#374151', textDecoration: 'none',
              border: '1.5px solid #e5e7eb',
            }}
          >
            <i className="bi bi-envelope" /> Report Issue
          </Link>
        </div>

        {/* Quick-tool links */}
        <p style={{ color: '#9ca3af', fontSize: '0.8rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>
          Popular Tools
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
          {tools.map(t => (
            <Link
              key={t.href} href={t.href}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '6px 14px', borderRadius: 8, fontSize: '0.82rem', fontWeight: 500,
                background: '#f3f4f6', color: '#374151', textDecoration: 'none',
                border: '1px solid #e5e7eb',
              }}
            >
              <i className={`bi ${t.icon}`} style={{ color: '#5b5ef4' }} />
              {t.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
