'use client';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import palette from '@/theme/palette';

const VALUES = [
  { icon: 'bi-shield-lock-fill', color: palette.values.privacy, title: 'Privacy First',
    text: "Every file stays on your device. Nothing is ever sent to a server — we don't store, read, or transmit your documents." },
  { icon: 'bi-gift-fill',             color: palette.values.free,    title: 'Always Free',
    text: 'No subscriptions, no paywalls, no watermarks. Every tool is completely free — today and forever.' },
  { icon: 'bi-lightning-charge-fill', color: palette.values.speed,   title: 'Instant & Offline',
    text: 'All processing happens locally in your browser. Works fast, even without an internet connection.' },
  { icon: 'bi-code-slash',            color: palette.values.craft,   title: 'Built with Care',
    text: "Crafted by a developer who values clean tools, great UX, and respecting the user's time and data." },
];

const PAGES = [
  { icon: 'bi-info-circle-fill',  color: palette.indigo[500],    bg: palette.indigo[50],     href: '/about',         title: 'About Us',        desc: 'Our mission, values, and the story behind MyEasyPDF.'            },
  { icon: 'bi-question-circle-fill', color: palette.status.warning, bg: palette.status.warningBg, href: '/faq',        title: 'FAQ',             desc: 'Answers to the most common questions about our tools.'           },
  { icon: 'bi-envelope-fill',     color: palette.tools.signPdf.color,  bg: palette.tools.signPdf.bg,  href: '/contact',  title: 'Contact',         desc: 'Reach the developer — bugs, features, or just to say hello.'    },
  { icon: 'bi-shield-lock-fill',  color: palette.status.success,  bg: palette.status.successBg, href: '/privacy',     title: 'Privacy Policy',  desc: 'How we protect your data. (Short answer: we never see it.)'     },
  { icon: 'bi-file-text-fill',    color: palette.text.muted,      bg: palette.surface.overlay,   href: '/terms',       title: 'Terms of Service', desc: 'Rules of use and our disclaimer of liability.'                  },
  { icon: 'bi-cookie',            color: '#f59e0b',               bg: '#fffbeb',                  href: '/cookie-policy', title: 'Cookie Policy', desc: 'How Google AdSense uses cookies and how to opt out.'             },
];

export default function CompanyPageClient() {
  return (
    <>
      <div className="page-header text-center">
        <Container>
          <h1 className="fw-bold mb-2"><i className="bi bi-buildings me-2"></i>Company</h1>
          <p className="lead opacity-90 mb-0">Everything about MyEasyPDF — mission, people, policies</p>
        </Container>
      </div>

      <Container className="py-4 py-md-5" style={{ maxWidth: 900 }}>

        {/* Mission */}
        <section className="mb-5">
          <Row className="g-4 align-items-center">
            <Col md={7}>
              <h2 className="fw-bold mb-3">Our Mission</h2>
              <p className="text-muted lh-lg">
                MyEasyPDF exists to give everyone access to professional-grade PDF tools —
                completely free, with zero compromise on privacy. Most online PDF tools upload
                your files to remote servers where they can be stored or shared without your knowledge.
              </p>
              <p className="text-muted lh-lg mb-0">
                We believe that&apos;s wrong. Every tool on MyEasyPDF runs entirely inside your browser.
                Your files <strong>never leave your device</strong> — not for a millisecond.
              </p>
            </Col>
            <Col md={5}>
              <div className="p-4 rounded-4" style={{ background: palette.surface.inset, border: `1px solid ${palette.border.default}` }}>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold"
                    style={{ width: 52, height: 52, background: palette.gradient.developer, color: '#fff', fontSize: '1.1rem' }}>
                    RV
                  </div>
                  <div>
                    <div className="fw-bold">Ritik Verma</div>
                    <small className="text-muted">Developer &amp; Creator</small>
                  </div>
                </div>
                <p className="text-muted small lh-lg mb-3">
                  Built MyEasyPDF out of frustration with ad-ridden PDF tools that upload sensitive
                  documents to unknown servers. This is the alternative.
                </p>
                <a href="mailto:ritikverma210@gmail.com"
                  className="btn btn-sm px-3 d-inline-flex align-items-center gap-2"
                  style={{ background: palette.gradient.primary, color: '#fff', border: 'none' }}>
                  <i className="bi bi-envelope-fill" />ritikverma210@gmail.com
                </a>
              </div>
            </Col>
          </Row>
        </section>

        {/* Values */}
        <section className="mb-5">
          <h2 className="fw-bold mb-4">What We Stand For</h2>
          <Row className="g-4">
            {VALUES.map((v, i) => (
              <Col key={i} sm={6}>
                <div className="d-flex gap-3 align-items-start">
                  <div className="flex-shrink-0 d-flex align-items-center justify-content-center rounded-3"
                    style={{ width: 48, height: 48, background: palette.surface.overlay }}>
                    <i className={`bi ${v.icon}`} style={{ fontSize: '1.35rem', color: v.color }} />
                  </div>
                  <div>
                    <h3 className="fw-bold mb-1" style={{ fontSize: '1rem' }}>{v.title}</h3>
                    <p className="text-muted small mb-0">{v.text}</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </section>

        {/* Story / stats */}
        <section className="mb-5">
          <h2 className="fw-bold mb-3">What MyEasyPDF does</h2>
          <p className="text-muted lh-lg">
            MyEasyPDF is a browser-based suite of <strong>15 free PDF tools</strong> covering the
            operations people actually need every day: merging and splitting documents, compressing
            large PDFs for email, rotating scanned pages, signing contracts, adding watermarks and page
            numbers, converting images to PDF and PDF pages back to images, and reorganising the page
            order of any document.
          </p>
          <p className="text-muted lh-lg">
            Every tool is built on the open-source <strong>pdf-lib</strong> and <strong>pdf.js</strong>
            libraries and runs entirely on your device. There are no server costs (nothing is uploaded),
            no accounts to maintain, and no subscriptions — which is why we can afford to keep the whole
            site free forever.
          </p>
          <p className="text-muted lh-lg mb-0">
            If you’re looking for a specific tool, head to
            {' '}<Link href="/all-pdf-tools" className="fw-semibold" style={{ color: palette.indigo[500] }}>the tool directory</Link>{' '}
            or browse the categories directly: merge, split, compress, rotate, sign, image to PDF,
            PDF to image, extract pages, remove pages, organize, add watermark, add page numbers,
            camera to PDF.
          </p>
        </section>

        {/* Company pages */}
        <section>
          <h2 className="fw-bold mb-4">Company Pages</h2>
          <Row className="g-3">
            {PAGES.map((p, i) => (
              <Col key={i} sm={6} md={4}>
                <Link href={p.href}
                  className="d-block p-3 rounded-4 text-decoration-none h-100"
                  style={{ background: p.bg, border: `1.5px solid ${p.color}22`, transition: 'box-shadow 0.15s, transform 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 4px 18px ${p.color}22`; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
                >
                  <i className={`bi ${p.icon} mb-2 d-block`} style={{ fontSize: '1.6rem', color: p.color }} />
                  <div className="fw-bold mb-1" style={{ color: palette.text.primary }}>{p.title}</div>
                  <p className="text-muted small mb-0 lh-sm">{p.desc}</p>
                </Link>
              </Col>
            ))}
          </Row>
        </section>

      </Container>
    </>
  );
}
