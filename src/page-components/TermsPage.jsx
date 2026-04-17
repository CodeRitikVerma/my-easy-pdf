import React from 'react';
import { Container, Alert } from 'react-bootstrap';
import SEO from '../components/SEO';
import palette from '../theme/palette';

const Section = ({ title, children }) => (
  <section className="mb-4">
    <h5 className="fw-bold mb-2">{title}</h5>
    <div className="text-muted lh-lg small">{children}</div>
  </section>
);

const TermsPage = () => {
  return (
    <>
      <SEO
        canonical="/terms"
        title="Terms of Service — MyEasyPDF"
        description="Terms of service for MyEasyPDF. Free to use for personal and commercial purposes. All processing happens locally in your browser."
        keywords="MyEasyPDF terms, terms of service, PDF tools terms"
      />
      <div className="page-header text-center">
        <Container>
          <h1 className="fw-bold mb-2"><i className="bi bi-file-text me-2"></i>Terms of Service</h1>
          <p className="lead opacity-90 mb-0">Last updated: January {new Date().getFullYear()}</p>
        </Container>
      </div>

      <Container className="py-4 py-md-5" style={{ maxWidth: 760 }}>

        <Alert variant="info" className="d-flex align-items-start gap-3 mb-5 rounded-3">
          <i className="bi bi-info-circle-fill flex-shrink-0 mt-1" style={{ fontSize: '1.2rem', color: palette.primary }}></i>
          <div>
            <strong>Short version:</strong> Use the tools fairly, don't misuse the service, and understand
            that processing happens at your own risk. We provide everything as-is, for free.
          </div>
        </Alert>

        <Section title="1. Acceptance of Terms">
          By using MyEasyPDF ("the Service"), you agree to these Terms of Service. If you do not agree,
          please do not use the Service. The Service is provided free of charge for personal and
          commercial use.
        </Section>

        <Section title="2. Description of Service">
          MyEasyPDF provides browser-based tools for PDF and image manipulation, including but not
          limited to: converting images to PDF, merging PDFs, splitting PDFs, rotating PDF pages, and
          extracting PDF pages as images. All processing occurs locally in the user's browser.
        </Section>

        <Section title="3. Acceptable Use">
          You agree to use the Service only for lawful purposes. You may not use the Service to:
          <ul className="mt-1">
            <li>Process, distribute, or create illegal content</li>
            <li>Attempt to reverse-engineer, scrape, or disrupt the Service</li>
            <li>Use the Service in any way that violates applicable laws or regulations</li>
          </ul>
        </Section>

        <Section title="4. Intellectual Property">
          You retain full ownership of all files you process using the Service. MyEasyPDF claims no
          rights over your documents, images, or output files. The code and design of the Service
          are owned by the developer (Ritik Verma).
        </Section>

        <Section title="5. Disclaimer of Warranties">
          The Service is provided "as is" without warranty of any kind, express or implied. We do
          not guarantee that the Service will be uninterrupted, error-free, or produce perfectly
          accurate results for all documents. Always keep backups of important files before processing.
        </Section>

        <Section title="6. Limitation of Liability">
          To the fullest extent permitted by law, MyEasyPDF and its developer shall not be liable
          for any indirect, incidental, special, or consequential damages arising from your use of
          the Service, including loss of data or document corruption.
        </Section>

        <Section title="7. Third-Party Links">
          The Service may contain links to third-party websites (e.g., social media profiles). We
          are not responsible for the content or privacy practices of those sites.
        </Section>

        <Section title="8. Modifications">
          We reserve the right to modify or discontinue the Service at any time. We may also update
          these Terms — any changes will be reflected with an updated date at the top of this page.
          Continued use of the Service constitutes acceptance of the updated Terms.
        </Section>

        <Section title="9. Governing Law">
          These Terms are governed by the laws of India. Any disputes arising from these Terms
          shall be subject to the exclusive jurisdiction of the courts of India.
        </Section>

        <Section title="10. Contact">
          For questions about these Terms, contact the developer on Instagram:{' '}
          <a
            href="https://www.instagram.com/ritikvermaofficial"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary fw-semibold"
          >
            @ritikvermaofficial
          </a>
        </Section>

      </Container>
    </>
  );
};

export default TermsPage;
