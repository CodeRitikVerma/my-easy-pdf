'use client';
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Link from 'next/link';
import palette from '@/theme/palette';

export default function ContactPageClient() {
  return (
    <>
      <div className="page-header text-center">
        <Container>
          <h1 className="fw-bold mb-2"><i className="bi bi-envelope me-2" aria-hidden="true"></i>Contact</h1>
          <p className="lead opacity-90 mb-0">Have a question, suggestion, or just want to say hi?</p>
        </Container>
      </div>

      <Container className="py-4 py-md-5" style={{ maxWidth: 760 }}>
        <Card className="border-0 shadow-sm rounded-4 overflow-hidden mb-4">
          <div style={{ background: palette.gradient.developer, height: 8 }} />
          <Card.Body className="p-4 p-md-5">
            <Row className="g-4 align-items-center">
              <Col xs="auto">
                <div className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                  style={{ width: 90, height: 90, background: palette.gradient.developer, color: 'white', fontSize: '2.2rem', fontWeight: 700 }}>
                  RV
                </div>
              </Col>
              <Col>
                <h2 className="fw-bold mb-1" style={{ fontSize: '1.4rem' }}>Ritik Verma</h2>
                <div className="d-flex flex-wrap gap-2 mb-3">
                  <span className="badge rounded-pill" style={{ background: palette.tools.imageToPdf.bg, color: '#374151' }}>Software Developer</span>
                  <span className="badge rounded-pill" style={{ background: palette.tools.pdfToImage.bg, color: '#374151' }}>Artist</span>
                  <span className="badge rounded-pill" style={{ background: palette.tools.mergePdf.bg, color: '#374151' }}>Creator</span>
                </div>
                <p className="text-muted mb-4 lh-lg">
                  I&apos;m the developer behind MyEasyPDF. Whether you&apos;ve found a bug, have a feature request,
                  want to collaborate, or just want to connect — feel free to reach out via email!
                </p>
                <a href="mailto:ritikverma210@gmail.com"
                  className="btn btn-lg px-4 fw-semibold d-inline-flex align-items-center gap-2"
                  style={{ background: palette.gradient.primary, color: 'white', border: 'none' }}>
                  <i className="bi bi-envelope-fill fs-5" aria-hidden="true"></i>ritikverma210@gmail.com
                </a>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <h2 className="fw-bold mb-3" style={{ fontSize: '1.15rem' }}>Before you reach out…</h2>
        <Row className="g-3">
          {[
            { icon: 'bi-question-circle-fill', color: palette.tools.imageToPdf.color, bg: palette.tools.imageToPdf.bg, title: 'Common Questions', text: 'Check the FAQ — your question is probably already answered there.', href: '/faq', label: 'View FAQ' },
            { icon: 'bi-shield-fill-check', color: palette.status.success, bg: palette.status.successBg, title: 'Privacy Concerns', text: 'All files stay in your browser. Read our privacy policy for full details.', href: '/privacy', label: 'Privacy Policy' },
            { icon: 'bi-tools', color: palette.status.warning, bg: palette.status.warningBg, title: 'Tool Not Working?', text: 'Try a different browser (Chrome recommended) or check the file format.', href: '/faq', label: 'Troubleshooting' },
          ].map((item, i) => (
            <Col key={i} sm={4}>
              <div className="p-3 rounded-3 h-100 border" style={{ background: item.bg }}>
                <i className={`bi ${item.icon} mb-2 d-block`} style={{ fontSize: '1.5rem', color: item.color }}></i>
                <h3 className="fw-bold mb-1" style={{ fontSize: '0.95rem' }}>{item.title}</h3>
                <p className="text-muted small mb-2">{item.text}</p>
                <Link href={item.href} className="small fw-semibold text-decoration-none" style={{ color: item.color }}>
                  {item.label} <i className="bi bi-arrow-right" aria-hidden="true"></i>
                </Link>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
