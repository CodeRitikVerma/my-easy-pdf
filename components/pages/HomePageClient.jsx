'use client';
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import useIsMobile from '@/hooks/useIsMobile';
import palette from '@/theme/palette';

const tools = [
  { title: 'Image to PDF',   description: 'Convert JPG, PNG, or WebP images into a PDF. Drag to reorder pages and set size.', icon: 'bi-images',          href: '/image-to-pdf',   ...palette.tools.imageToPdf },
  { title: 'Merge PDF',      description: 'Combine multiple PDF files into one. Drag files to set the merge order.',          icon: 'bi-layers-fill',     href: '/merge-pdf',      ...palette.tools.mergePdf  },
  { title: 'PDF to Image',   description: 'Extract every page of a PDF as PNG or JPEG. Download individually or as a ZIP.',   icon: 'bi-card-image',      href: '/pdf-to-image',   ...palette.tools.pdfToImage },
  { title: 'Split PDF',      description: 'Split a PDF into individual pages or define custom page ranges.',                  icon: 'bi-scissors',        href: '/split-pdf',      ...palette.tools.splitPdf  },
  { title: 'Sign PDF',       description: 'Add your typed or hand-drawn signature to any PDF. Drag it anywhere on the page.',icon: 'bi-pen',             href: '/sign-pdf',       ...palette.tools.signPdf   },
  { title: 'Camera to PDF',  description: 'Use your phone camera to snap photos and instantly convert them into a PDF.',     icon: 'bi-camera-fill',     href: '/camera-to-pdf',  ...palette.tools.cameraPdf, badge: 'Mobile' },
];

const features = [
  { icon: 'bi-shield-lock-fill',       gradient: palette.featureGradients.privacy, title: '100% Private',        text: 'Files are processed entirely in your browser. Nothing is ever uploaded to a server.' },
  { icon: 'bi-lightning-charge-fill',  gradient: palette.featureGradients.speed,   title: 'Instant Processing',  text: 'No waiting for uploads. Your device handles everything locally at full speed.' },
  { icon: 'bi-gift-fill',              gradient: palette.featureGradients.free,    title: 'Completely Free',     text: 'No sign-up, no watermarks, no limits. Every tool is free to use, forever.' },
];

export default function HomePageClient() {
  const isMobile = useIsMobile();

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero-section text-center">
        <div className="hero-glow-bl" />
        <Container style={{ position: 'relative', zIndex: 1 }}>
          <div className="mb-3">
            <div className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3"
              style={{ width: 72, height: 72, background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <i className="bi bi-file-earmark-pdf-fill" style={{ fontSize: '2.2rem' }}></i>
            </div>
          </div>
          <h1 className="display-4 fw-bold mb-3">MyEasyPDF</h1>
          <p className="lead mb-4 opacity-90 mx-auto" style={{ maxWidth: 520 }}>
            Free PDF tools that work entirely in your browser —<br className="d-none d-md-block" />
            no uploads, no accounts, no limits.
          </p>

          <div className="d-flex flex-wrap gap-2 justify-content-center mb-4">
            {['🔒 100% Private', '⚡ Instant', '🎁 Always Free'].map((badge, i) => (
              <span key={i} style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 100, padding: '0.3rem 0.9rem', fontSize: '0.82rem', color: 'rgba(255,255,255,0.92)' }}>
                {badge}
              </span>
            ))}
          </div>

          <div className="d-flex flex-wrap gap-2 justify-content-center">
            <Button as={Link} href="/image-to-pdf" size="lg" variant="light" className="fw-semibold px-4" style={{ borderRadius: 10 }}>
              <i className="bi bi-play-fill me-1"></i>Get Started
            </Button>
            {isMobile ? (
              <Button as={Link} href="/camera-to-pdf" size="lg" variant="outline-light" className="fw-semibold px-4" style={{ borderRadius: 10 }}>
                <i className="bi bi-camera-fill me-2"></i>Create PDF
              </Button>
            ) : (
              <Button as={Link} href="/merge-pdf" size="lg" variant="outline-light" className="fw-semibold px-4" style={{ borderRadius: 10 }}>
                <i className="bi bi-layers-fill me-2"></i>Merge PDFs
              </Button>
            )}
          </div>
        </Container>
      </section>

      {/* ── Tools Grid ── */}
      <section className="py-4 py-md-5" style={{ background: palette.surface.page }}>
        <Container>
          <div className="text-center mb-4 mb-md-5">
            <h2 className="fw-bold mb-2" style={{ color: palette.indigo[900] }}>All PDF Tools</h2>
            <p className="text-muted mb-0">Everything you need to work with PDFs and images — all free, all private</p>
          </div>
          <Row className="g-3 g-md-4 justify-content-center">
            {tools.map((tool, i) => (
              <Col key={i} xs={12} sm={6} lg={4}>
                <Card as={Link} href={tool.href} className="tool-card h-100 position-relative">
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-start justify-content-between mb-3">
                      <div className="d-inline-flex align-items-center justify-content-center rounded-3"
                        style={{ width: 56, height: 56, background: tool.iconBg, boxShadow: `0 6px 16px ${tool.color}33` }}>
                        <i className={`bi ${tool.icon}`} style={{ fontSize: '1.6rem', color: palette.text.white }}></i>
                      </div>
                      {tool.badge && (
                        <span className="badge rounded-pill" style={{ background: tool.bg, color: tool.color, fontSize: '0.7rem', border: `1px solid ${tool.color}33` }}>
                          <i className="bi bi-phone me-1"></i>{tool.badge}
                        </span>
                      )}
                    </div>
                    <Card.Title className="fw-bold fs-5 mb-2" style={{ color: palette.indigo[900] }}>{tool.title}</Card.Title>
                    <Card.Text className="text-muted small mb-0">{tool.description}</Card.Text>
                  </Card.Body>
                  <Card.Footer className="bg-transparent border-0 pb-3 px-4 pt-0">
                    <span className="fw-semibold small d-flex align-items-center gap-1" style={{ color: tool.color }}>
                      Open Tool <i className="bi bi-arrow-right"></i>
                    </span>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ── Features ── */}
      <section className="py-4 py-md-5 section-features">
        <Container style={{ position: 'relative', zIndex: 1 }}>
          <div className="text-center mb-4 mb-md-5">
            <h2 className="fw-bold mb-2" style={{ color: palette.indigo[900] }}>Why MyEasyPDF?</h2>
            <p className="text-muted mb-0">Built with your privacy and convenience in mind</p>
          </div>
          <Row className="text-center g-4">
            {features.map((f, i) => (
              <Col key={i} xs={12} md={4}>
                <div className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3"
                  style={{ width: 64, height: 64, background: f.gradient, boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}>
                  <i className={`bi ${f.icon}`} style={{ fontSize: '1.7rem', color: palette.text.white }}></i>
                </div>
                <h5 className="fw-bold mb-2" style={{ color: palette.indigo[900] }}>{f.title}</h5>
                <p className="text-muted mb-0 small">{f.text}</p>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
}
