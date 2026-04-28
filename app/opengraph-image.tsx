import { ImageResponse } from 'next/og';

export const runtime     = 'edge';
export const alt         = 'MyEasyPDF — Free Online PDF Tools';
export const size        = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 55%, #7c3aed 100%)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Glow blobs */}
        <div style={{
          position: 'absolute', top: -120, right: -120,
          width: 500, height: 500, borderRadius: '50%',
          background: 'rgba(167,139,250,0.22)', display: 'flex',
        }} />
        <div style={{
          position: 'absolute', bottom: -100, left: -80,
          width: 380, height: 380, borderRadius: '50%',
          background: 'rgba(99,102,241,0.18)', display: 'flex',
        }} />

        {/* Header: logo + brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          {/* PDF icon */}
          <div style={{
            width: 84, height: 84, borderRadius: 18,
            background: 'rgba(255,255,255,0.14)',
            border: '1.5px solid rgba(255,255,255,0.22)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 46,
          }}>
            📄
          </div>
          <span style={{
            fontSize: 58, fontWeight: 800, color: '#ffffff',
            letterSpacing: '-1px',
          }}>
            MyEasyPDF
          </span>
        </div>

        {/* Tagline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <p style={{
            margin: 0, fontSize: 30, lineHeight: 1.4,
            color: 'rgba(255,255,255,0.82)',
            fontWeight: 400,
          }}>
            Free PDF tools — 100% in your browser.
          </p>
          <p style={{ margin: 0, fontSize: 24, color: 'rgba(255,255,255,0.55)' }}>
            No uploads. No account. No watermarks.
          </p>
        </div>

        {/* Tool pills */}
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          {['Image to PDF', 'Merge PDF', 'Split PDF', 'Rotate PDF', 'PDF to Image', 'Compress PDF'].map((tool) => (
            <div key={tool} style={{
              background: 'rgba(255,255,255,0.13)',
              border: '1px solid rgba(255,255,255,0.22)',
              borderRadius: 100, padding: '10px 22px',
              fontSize: 19, color: 'rgba(255,255,255,0.9)',
              display: 'flex',
            }}>
              {tool}
            </div>
          ))}
        </div>

        {/* URL */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          fontSize: 20, color: 'rgba(255,255,255,0.5)',
        }}>
          🔒 myeasypdf.com
        </div>
      </div>
    ),
    { ...size },
  );
}
