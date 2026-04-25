'use client';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import palette from '@/theme/palette';

const CATEGORIES = [
  {
    title: 'Organize PDF',
    icon: 'bi-grid-3x3',
    color: '#8b5cf6',
    bg: '#f5f3ff',
    tools: [
      { icon: 'bi-layers-fill',      href: '/merge-pdf',      title: 'Merge PDF',      desc: 'Combine multiple PDFs into one file'       },
      { icon: 'bi-scissors',         href: '/split-pdf',      title: 'Split PDF',      desc: 'Split a PDF into separate pages or ranges'  },
      { icon: 'bi-file-earmark-x',   href: '/remove-pages',   title: 'Remove Pages',   desc: 'Delete unwanted pages from your PDF'        },
      { icon: 'bi-file-earmark-plus',href: '/extract-pages',  title: 'Extract Pages',  desc: 'Pull specific pages out into a new PDF'     },
      { icon: 'bi-grid',             href: '/organize-pdf',   title: 'Organize PDF',   desc: 'Drag-and-drop to reorder pages'             },
    ],
  },
  {
    title: 'Optimize PDF',
    icon: 'bi-speedometer2',
    color: '#10b981',
    bg: '#ecfdf5',
    tools: [
      { icon: 'bi-file-zip',         href: '/compress-pdf',   title: 'Compress PDF',   desc: 'Shrink file size without losing quality'    },
    ],
  },
  {
    title: 'Convert to PDF',
    icon: 'bi-file-earmark-arrow-down',
    color: '#f59e0b',
    bg: '#fffbeb',
    tools: [
      { icon: 'bi-images',           href: '/image-to-pdf',   title: 'Image to PDF',   desc: 'Turn JPG, PNG, WebP images into a PDF'      },
      { icon: 'bi-filetype-png',     href: '/png-to-pdf',     title: 'PNG to PDF',     desc: 'Combine PNG images into a single PDF file'  },
      { icon: 'bi-camera-fill',      href: '/camera-to-pdf',  title: 'Camera to PDF',  desc: 'Scan documents with your device camera'     },
    ],
  },
  {
    title: 'Convert from PDF',
    icon: 'bi-file-earmark-arrow-up',
    color: '#ec4899',
    bg: '#fdf2f8',
    tools: [
      { icon: 'bi-card-image',       href: '/pdf-to-image',   title: 'PDF to Image',   desc: 'Export every page as PNG or JPEG'           },
    ],
  },
  {
    title: 'Edit & Customize',
    icon: 'bi-pencil-square',
    color: '#6366f1',
    bg: '#eef2ff',
    tools: [
      { icon: 'bi-crop',             href: '/crop-pdf',        title: 'Crop PDF',        desc: 'Trim margins or whitespace from any page'   },
      { icon: 'bi-pen',              href: '/sign-pdf',        title: 'Sign PDF',        desc: 'Draw or type your signature on any page'   },
      { icon: 'bi-arrow-clockwise',  href: '/rotate-pdf',      title: 'Rotate PDF',      desc: 'Rotate individual pages or the whole doc'  },
      { icon: 'bi-droplet',          href: '/add-watermark',   title: 'Add Watermark',   desc: 'Overlay text on every page, with previews' },
      { icon: 'bi-123',              href: '/add-page-numbers',title: 'Add Page Numbers',desc: 'Stamp numbered footers or headers on pages'},
    ],
  },
];

const ToolCard = ({ tool, color, bg }) => (
  <Link
    href={tool.href}
    className="d-flex align-items-start gap-3 p-3 rounded-3 text-decoration-none"
    style={{ background: '#fff', border: '1.5px solid #e5e7eb', transition: 'box-shadow 0.15s, border-color 0.15s, transform 0.15s' }}
    onMouseEnter={e => {
      e.currentTarget.style.boxShadow = `0 4px 18px ${color}22`;
      e.currentTarget.style.borderColor = `${color}55`;
      e.currentTarget.style.transform = 'translateY(-2px)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.boxShadow = 'none';
      e.currentTarget.style.borderColor = '#e5e7eb';
      e.currentTarget.style.transform = 'none';
    }}
  >
    <div className="flex-shrink-0 d-flex align-items-center justify-content-center rounded-3"
      style={{ width: 40, height: 40, background: bg }}>
      <i className={`bi ${tool.icon}`} style={{ fontSize: '1.1rem', color }} />
    </div>
    <div className="min-w-0">
      <div className="fw-semibold small mb-0" style={{ color: palette.text.primary }}>{tool.title}</div>
      <div className="text-muted" style={{ fontSize: '0.78rem', lineHeight: 1.4 }}>{tool.desc}</div>
    </div>
    <i className="bi bi-arrow-right ms-auto flex-shrink-0 align-self-center"
      style={{ fontSize: '0.85rem', color }} />
  </Link>
);

export default function AllPdfToolsClient() {
  const totalTools = CATEGORIES.reduce((sum, c) => sum + c.tools.length, 0);

  return (
    <>
      <div className="page-header text-center">
        <Container>
          <h1 className="fw-bold mb-2"><i className="bi bi-grid-fill me-2"></i>All PDF Tools</h1>
          <p className="lead opacity-90 mb-0">{totalTools} free browser-based tools — no uploads, no account, always private</p>
        </Container>
      </div>

      <Container className="py-4 py-md-5" style={{ maxWidth: 960 }}>
        {/* ── SEO intro ── */}
        <section className="mb-5">
          <p style={{ color: palette.text.secondary, fontSize: '1.02rem', lineHeight: 1.75 }}>
            MyEasyPDF offers a complete suite of <strong>free online PDF tools</strong> that run entirely inside
            your web browser. Merge, split, compress, rotate and sign PDFs, convert images to PDF or PDF pages
            back into images, add watermarks or page numbers, and reorganise documents — all without creating
            an account and without uploading a single byte to a server.
          </p>
          <p style={{ color: palette.text.secondary, fontSize: '1.02rem', lineHeight: 1.75 }}>
            Each tool is built on <strong>pdf-lib</strong> and <strong>pdf.js</strong>, the same open-source
            libraries trusted by Mozilla and thousands of production apps. That means your files stay on your
            device — ideal for confidential contracts, ID documents, medical records and internal reports.
          </p>
        </section>

        {CATEGORIES.map((cat, ci) => (
          <section key={ci} className="mb-5">
            {/* Category header */}
            <div className="d-flex align-items-center gap-3 mb-3 pb-2"
              style={{ borderBottom: `2px solid ${cat.color}33` }}>
              <div className="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0"
                style={{ width: 40, height: 40, background: cat.color + '18', border: `1.5px solid ${cat.color}33` }}>
                <i className={`bi ${cat.icon}`} style={{ fontSize: '1.1rem', color: cat.color }} />
              </div>
              <div>
                <h2 className="fw-bold mb-0" style={{ color: palette.text.primary, fontSize: '1.15rem' }}>{cat.title}</h2>
                <small className="text-muted">{cat.tools.length} tool{cat.tools.length !== 1 ? 's' : ''}</small>
              </div>
            </div>

            <Row className="g-3">
              {cat.tools.map((tool, ti) => (
                <Col key={ti} sm={6} lg={4}>
                  <ToolCard tool={tool} color={cat.color} bg={cat.bg} />
                </Col>
              ))}
            </Row>
          </section>
        ))}

        {/* ── Why-use-us ── */}
        <section className="mb-5">
          <h2 className="fw-bold mb-3" style={{ color: palette.text.primary }}>Why choose MyEasyPDF?</h2>
          <Row className="g-4">
            <Col md={6}>
              <h3 className="fw-bold mb-2" style={{ fontSize: '1.05rem', color: palette.text.primary }}>
                <i className="bi bi-shield-lock text-primary me-2" /> Browser-based privacy
              </h3>
              <p className="text-muted small mb-0" style={{ lineHeight: 1.7 }}>
                Every tool processes PDFs locally with JavaScript. Your files never leave your device,
                so confidential documents stay confidential.
              </p>
            </Col>
            <Col md={6}>
              <h3 className="fw-bold mb-2" style={{ fontSize: '1.05rem', color: palette.text.primary }}>
                <i className="bi bi-currency-dollar text-primary me-2" /> Completely free
              </h3>
              <p className="text-muted small mb-0" style={{ lineHeight: 1.7 }}>
                No trial period, no subscription, no watermarks and no hidden limits — ever. Use every
                tool as often as you want.
              </p>
            </Col>
            <Col md={6}>
              <h3 className="fw-bold mb-2" style={{ fontSize: '1.05rem', color: palette.text.primary }}>
                <i className="bi bi-lightning-charge text-primary me-2" /> Instant results
              </h3>
              <p className="text-muted small mb-0" style={{ lineHeight: 1.7 }}>
                Since there’s no upload or queue, most operations finish in seconds — even for PDFs
                dozens of megabytes in size.
              </p>
            </Col>
            <Col md={6}>
              <h3 className="fw-bold mb-2" style={{ fontSize: '1.05rem', color: palette.text.primary }}>
                <i className="bi bi-phone text-primary me-2" /> Works everywhere
              </h3>
              <p className="text-muted small mb-0" style={{ lineHeight: 1.7 }}>
                Runs on Windows, Mac, Linux, Android and iOS — anywhere with a modern browser. No
                installs, no app-store downloads.
              </p>
            </Col>
          </Row>
        </section>

        {/* ── FAQ ── */}
        <section className="mb-5">
          <h2 className="fw-bold mb-3" style={{ color: palette.text.primary }}>PDF tools — frequently asked questions</h2>
          <div className="mb-3">
            <h3 className="fw-semibold mb-1" style={{ fontSize: '1rem', color: palette.text.primary }}>Are all these PDF tools really free?</h3>
            <p className="text-muted small mb-0" style={{ lineHeight: 1.7 }}>
              Yes. Every tool on MyEasyPDF is 100% free with no account, no trial and no watermarks. We
              keep the lights on through privacy-respecting ads, not by charging you.
            </p>
          </div>
          <div className="mb-3">
            <h3 className="fw-semibold mb-1" style={{ fontSize: '1rem', color: palette.text.primary }}>Do I need to install anything?</h3>
            <p className="text-muted small mb-0" style={{ lineHeight: 1.7 }}>
              Nothing to install. Every tool works inside any modern web browser on desktop or mobile.
            </p>
          </div>
          <div className="mb-3">
            <h3 className="fw-semibold mb-1" style={{ fontSize: '1rem', color: palette.text.primary }}>Is my PDF uploaded to your server?</h3>
            <p className="text-muted small mb-0" style={{ lineHeight: 1.7 }}>
              No. MyEasyPDF uses <em>client-side</em> PDF libraries (pdf-lib, pdf.js), so every merge,
              split, compress, sign or watermark operation happens on your computer, not ours.
            </p>
          </div>
          <div className="mb-3">
            <h3 className="fw-semibold mb-1" style={{ fontSize: '1rem', color: palette.text.primary }}>Which is the best free PDF editor online?</h3>
            <p className="text-muted small mb-0" style={{ lineHeight: 1.7 }}>
              If privacy and price matter, MyEasyPDF is hard to beat — it bundles 13 of the most common
              PDF operations, charges nothing, and never uploads your files. For advanced vector editing
              or redaction, a desktop app like Adobe Acrobat is still the gold standard.
            </p>
          </div>
        </section>

        {/* Privacy reassurance */}
        <div className="text-center p-4 rounded-4"
          style={{ background: palette.surface.inset, border: `1px solid ${palette.border.default}` }}>
          <i className="bi bi-shield-lock-fill text-primary mb-2 d-block" style={{ fontSize: '1.8rem' }} />
          <h3 className="fw-bold mb-1" style={{ fontSize: '1rem' }}>100% Private — Always</h3>
          <p className="text-muted small mb-0">
            Every tool processes files entirely in your browser. Nothing is uploaded to any server.
            No account required. Completely free.
          </p>
        </div>
      </Container>
    </>
  );
}
