'use client';
import React from 'react';
import { Container, Alert } from 'react-bootstrap';
import palette from '@/theme/palette';

const Section = ({ title, children }) => (
  <section className="mb-4">
    <h5 className="fw-bold mb-2">{title}</h5>
    <div className="text-muted lh-lg small">{children}</div>
  </section>
);

export default function TermsPageClient() {
  return (
    <>
      <div className="page-header text-center">
        <Container>
          <h1 className="fw-bold mb-2"><i className="bi bi-file-text me-2"></i>Terms of Service</h1>
          <p className="lead opacity-90 mb-0">Last updated: January 2026</p>
        </Container>
      </div>

      <Container className="py-4 py-md-5" style={{ maxWidth: 760 }}>
        <Alert variant="info" className="d-flex align-items-start gap-3 mb-5 rounded-3">
          <i className="bi bi-info-circle-fill flex-shrink-0 mt-1" style={{ fontSize: '1.2rem', color: palette.primary }}></i>
          <div>
            <strong>Short version:</strong> Use the tools fairly, don&apos;t misuse the service, and understand
            that processing happens at your own risk. We provide everything as-is, for free.
          </div>
        </Alert>

        <Section title="1. Acceptance of Terms">
          By using MyEasyPDF, you agree to these Terms. The Service is provided free of charge for personal and commercial use.
        </Section>

        <Section title="2. Description of Service">
          MyEasyPDF provides browser-based tools for PDF and image manipulation. All processing occurs locally in the user&apos;s browser.
        </Section>

        <Section title="3. Acceptable Use">
          You agree to use the Service only for lawful purposes. You may not:
          <ul className="mt-1">
            <li>Process, distribute, or create illegal content</li>
            <li>Attempt to reverse-engineer, scrape, or disrupt the Service</li>
            <li>Use the Service in any way that violates applicable laws or regulations</li>
          </ul>
        </Section>

        <Section title="4. Intellectual Property">
          You retain full ownership of all files you process. MyEasyPDF claims no rights over your documents.
          The code and design of the Service are owned by the developer (Ritik Verma).
        </Section>

        <Section title="5. Disclaimer of Warranties">
          The Service is provided &ldquo;as is&rdquo; without warranty of any kind. Always keep backups of important files before processing.
        </Section>

        <Section title="6. Limitation of Liability">
          To the fullest extent permitted by law, MyEasyPDF and its developer shall not be liable
          for any indirect, incidental, or consequential damages arising from your use of the Service.
        </Section>

        <Section title="7. Third-Party Links">
          The Service may contain links to third-party websites. We are not responsible for their content or privacy practices.
        </Section>

        <Section title="8. Modifications">
          We reserve the right to modify or discontinue the Service at any time. Continued use constitutes acceptance of updated Terms.
        </Section>

        <Section title="9. Governing Law">
          These Terms are governed by the laws of India.
        </Section>

        <Section title="10. Contact">
          Questions? Contact the developer by email:{' '}
          <a href="mailto:ritikverma210@gmail.com" className="text-primary fw-semibold">
            ritikverma210@gmail.com
          </a>
        </Section>
      </Container>
    </>
  );
}
